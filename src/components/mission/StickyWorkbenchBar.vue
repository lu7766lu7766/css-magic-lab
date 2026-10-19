<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { 
  ArrowUp, 
  Sparkles, 
  Target, 
  Pipette, 
  Check, 
  Minimize2, 
  Maximize2,
  Code2,
  ChevronDown,
  ChevronUp
} from 'lucide-vue-next'
import { scopeCss } from '../../data/cssGenerators.js'
import { copyText } from '../../utils/clipboard.js'

const props = defineProps({
  mission: { type: Object, required: true },
  currentCss: { type: String, required: true },
  score: { type: Number, default: 0 },
  stars: { type: Number, default: 0 }
})

const emit = defineEmits(['scrollToWorkbench', 'pickColor'])

const isVisible = ref(false)
// 手機上兩張畫布會上下堆疊、佔掉大半螢幕，預設先收合只留資訊條
const isCollapsed = ref(typeof window !== 'undefined' && window.innerWidth < 768)
const showCssDrawer = ref(false)
const copiedColor = ref(null)

// 滾動監聽：主工作台的畫布捲出視野（被 Header 蓋住）後才出現，避免同一畫面出現兩份對照
const HEADER_HEIGHT = 64
const CANVAS_VISIBLE_HEIGHT = 360
function handleScroll() {
  const workbench = document.getElementById('workbench')
  isVisible.value = workbench
    ? workbench.getBoundingClientRect().top + CANVAS_VISIBLE_HEIGHT < HEADER_HEIGHT
    : window.scrollY > 260
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scopedUserCss = computed(() => scopeCss(props.currentCss, 'sticky-user-scope'))
const scopedTargetCss = computed(() => scopeCss(props.mission.designerTargetCss, 'sticky-target-scope'))

async function copyColor(hex) {
  if (!(await copyText(hex))) return
  copiedColor.value = hex
  emit('pickColor', hex)
  setTimeout(() => {
    copiedColor.value = null
  }, 1800)
}
</script>

<template>
  <!-- 頂部全寬吸附式對比列：寬度與主內容容器完全一致 (max-w-7xl)，牢牢貼齊 Header 下方 -->
  <aside
    aria-label="頂部全寬即時對比列"
    class="fixed top-16 left-0 right-0 z-30 transition-all duration-300 ease-out select-none border-b border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-lg"
    :class="[
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    ]"
    :aria-hidden="!isVisible"
    :inert="!isVisible"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <!-- 頂部精簡控制資訊條 -->
      <div class="flex items-center justify-between gap-3 text-xs" :class="isCollapsed ? '' : 'mb-1.5 pb-1 border-b border-slate-100 dark:border-slate-800/60'">
        <!-- 關卡與得分狀態 -->
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 min-w-0">
            <span class="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
            <span class="shrink-0">第 {{ mission.number }} 關</span>
            <span class="hidden lg:inline font-medium text-slate-500 dark:text-slate-400 truncate">{{ mission.title }}</span>
          </span>
          <span v-if="score > 0" class="shrink-0 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[11px] font-black border border-amber-300/60 dark:border-amber-700/60">
            目前 {{ score }} 分 ★{{ stars }}
          </span>
        </div>

        <!-- 中間/右側操作按鈕 -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- 快捷吸色膠囊 -->
          <div v-if="mission.targetInspector?.colors" class="hidden md:flex items-center gap-1.5 mr-2">
            <div class="flex items-center gap-1 text-[11px] text-slate-500">
              <Pipette class="w-3 h-3 text-purple-500" />
              <span>目標色：</span>
            </div>
            <button
              v-for="c in mission.targetInspector.colors.slice(0, 3)"
              :key="c.hex"
              type="button"
              @click="copyColor(c.hex)"
              class="flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-purple-400 transition-colors text-[10px] font-mono"
              :title="`點擊吸取 ${c.label} (${c.hex})`"
            >
              <span class="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-slate-600" :style="{ background: c.hex }"></span>
              <span class="font-bold text-slate-700 dark:text-slate-300">{{ c.hex }}</span>
              <Check v-if="copiedColor === c.hex" class="w-2.5 h-2.5 text-emerald-500" />
            </button>
          </div>

          <!-- 查看生成 CSS 抽屜按鈕 -->
          <button
            @click="showCssDrawer = !showCssDrawer; isCollapsed = false"
            :aria-expanded="showCssDrawer"
            aria-label="切換 CSS 代碼"
            class="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-[11px] font-medium"
            :class="{ 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 border-purple-300 dark:border-purple-700': showCssDrawer }"
          >
            <Code2 class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">{{ showCssDrawer ? '收合 CSS' : '查看 CSS' }}</span>
          </button>

          <!-- 回到頂部按鈕 -->
          <button
            @click="emit('scrollToWorkbench')"
            class="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-[11px]"
            title="捲回主工作台"
            aria-label="捲回主工作台"
          >
            <ArrowUp class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">回主舞台</span>
          </button>

          <!-- 收折/展開頂部列按鈕 -->
          <button
            @click="isCollapsed = !isCollapsed"
            class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            :title="isCollapsed ? '展開對比畫布' : '收合對比畫布'"
            :aria-label="isCollapsed ? '展開對比畫布' : '收合對比畫布'"
            :aria-expanded="!isCollapsed"
          >
            <ChevronDown v-if="isCollapsed" class="w-4 h-4" />
            <ChevronUp v-else class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- 雙畫布並排對照區 (當未收折時顯示，高度升級自適應，標籤獨立且元件全覽一眼看清) -->
      <div v-show="!isCollapsed" class="grid grid-cols-1 md:grid-cols-2 gap-3 transition-all duration-300">
        <!-- 左欄：🛠️ 我的當前樣式 (即時連動使用者調整，高度自動貼合內容) -->
        <div class="flex flex-col rounded-xl border border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-900 overflow-hidden shadow-xs ">
          <!-- 獨立頂部標籤列（非 absolute 覆蓋，徹底避免遮蔽畫面物件） -->
          <div class="px-3 py-1.5 bg-purple-50/90 dark:bg-purple-950/60 border-b border-purple-100 dark:border-purple-900/50 flex items-center justify-between text-[11px] font-bold text-purple-700 dark:text-purple-300 shrink-0">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>我的當前樣式</span>
            </div>
            <span class="text-[10px] font-medium text-purple-500/80 dark:text-purple-400/80">即時效果</span>
          </div>

          <!-- 樣式隔離注入 -->
          <component :is="'style'">
            {{ scopedUserCss }}
          </component>

          <!-- 畫布內容區 (1:1 原尺寸，高度自動貼合內容，不縮放、無捲軸) -->
          <div
            class="flex-1 w-full flex min-h-24 p-2.5 bg-slate-50/60 dark:bg-slate-950/60"
            style="background-image: radial-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px); background-size: 14px 14px;"
          >
            <div class="sticky-user-scope w-full flex justify-center m-auto">
              <div v-html="mission.htmlTemplate"></div>
            </div>
          </div>
        </div>

        <!-- 右欄：🎯 設計師目標樣式 (滿分標準參考，高度自動貼合內容) -->
        <div class="flex flex-col rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900 overflow-hidden shadow-xs ">
          <!-- 獨立頂部標籤列（非 absolute 覆蓋，徹底避免遮蔽畫面物件） -->
          <div class="px-3 py-1.5 bg-emerald-50/90 dark:bg-emerald-950/60 border-b border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
            <div class="flex items-center gap-1.5">
              <Target class="w-3.5 h-3.5 text-emerald-500" />
              <span>設計師目標樣式</span>
            </div>
            <span class="text-[10px] font-medium text-emerald-600/80 dark:text-emerald-400/80">滿分參考</span>
          </div>

          <!-- 目標樣式隔離注入 -->
          <component :is="'style'">
            {{ scopedTargetCss }}
          </component>

          <!-- 畫布內容區 (1:1 原尺寸，高度自動貼合內容，不縮放、無捲軸) -->
          <div
            class="flex-1 w-full flex min-h-24 p-2.5 bg-slate-50/60 dark:bg-slate-950/60"
            style="background-image: radial-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px); background-size: 14px 14px;"
          >
            <div class="sticky-target-scope w-full flex justify-center m-auto">
              <div v-html="mission.htmlTemplate"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 可展開的 CSS 即時代碼抽屜 (不佔據畫面，想看才點開) -->
      <div
        v-if="showCssDrawer && !isCollapsed"
        class="mt-2 p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs max-h-48 overflow-y-auto border border-slate-800 shadow-inner"
      >
        <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
          <span>即時生成的 CSS 代碼</span>
          <span class="text-purple-400">已自動同步當前設定</span>
        </div>
        <pre class="leading-relaxed whitespace-pre-wrap select-text text-emerald-300">{{ currentCss }}</pre>
      </div>
    </div>
  </aside>
</template>
