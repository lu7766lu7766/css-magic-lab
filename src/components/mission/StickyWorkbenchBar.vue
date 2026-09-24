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

const props = defineProps({
  mission: { type: Object, required: true },
  currentCss: { type: String, required: true },
  score: { type: Number, default: 0 },
  stars: { type: Number, default: 0 }
})

const emit = defineEmits(['scrollToWorkbench', 'pickColor'])

const isVisible = ref(false)
const isCollapsed = ref(false)
const showCssDrawer = ref(false)
const copiedColor = ref(null)

// 滾動監聽：滾動超過 260px (主工作台離開最佳視野時) 自動吸附在頂部
function handleScroll() {
  if (window.scrollY > 260) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scopedUserCss = computed(() => scopeCss(props.currentCss, 'sticky-user-scope'))
const scopedTargetCss = computed(() => scopeCss(props.mission.designerTargetCss, 'sticky-target-scope'))

function copyColor(hex) {
  navigator.clipboard.writeText(hex)
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
    class="fixed top-16 left-0 right-0 z-30 transition-all duration-300 ease-out select-none border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg"
    :class="[
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-2">
      <!-- 頂部精簡控制資訊條 -->
      <div class="flex items-center justify-between gap-3 text-xs mb-1.5 pb-1 border-b border-slate-100 dark:border-slate-800/60">
        <!-- 關卡與得分狀態 -->
        <div class="flex items-center gap-2.5">
          <span class="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span>頂部即時對照列</span>
            <span class="text-[11px] font-normal text-slate-500">（寬度與工作台完全一致，零跑版）</span>
          </span>
          <span v-if="score > 0" class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[11px] font-black border border-amber-300/60 dark:border-amber-700/60">
            目前 {{ score }} 分 ★{{ stars }}
          </span>
        </div>

        <!-- 中間/右側操作按鈕 -->
        <div class="flex items-center gap-2">
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
            @click="showCssDrawer = !showCssDrawer"
            class="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-[11px] font-medium"
            :class="{ 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 border-purple-300 dark:border-purple-700': showCssDrawer }"
          >
            <Code2 class="w-3.5 h-3.5" />
            <span>{{ showCssDrawer ? '收合 CSS' : '查看 CSS' }}</span>
          </button>

          <!-- 回到頂部按鈕 -->
          <button
            @click="emit('scrollToWorkbench')"
            class="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-[11px]"
            title="平滑滾動回頂部主畫布"
          >
            <ArrowUp class="w-3.5 h-3.5" />
            <span>回主舞台</span>
          </button>

          <!-- 收折/展開頂部列按鈕 -->
          <button
            @click="isCollapsed = !isCollapsed"
            class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            :title="isCollapsed ? '展開對比畫布' : '收合對比畫布'"
          >
            <ChevronDown v-if="isCollapsed" class="w-4 h-4" />
            <ChevronUp v-else class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- 雙畫布並排對照區 (當未收折時顯示，高度提升為 256px~288px，標籤獨立且完全無滾動條，卡片全覽一眼看清) -->
      <div v-show="!isCollapsed" class="grid grid-cols-1 md:grid-cols-2 gap-3 transition-all duration-300">
        <!-- 左欄：🛠️ 我的當前樣式 (即時連動使用者調整) -->
        <div class="flex flex-col rounded-xl border border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-900 overflow-hidden shadow-xs h-64 sm:h-72">
          <!-- 獨立頂部標籤列（非 absolute 覆蓋，徹底避免遮蔽畫面物件） -->
          <div class="px-3 py-1.5 bg-purple-50/90 dark:bg-purple-950/60 border-b border-purple-100 dark:border-purple-900/50 flex items-center justify-between text-[11px] font-bold text-purple-700 dark:text-purple-300 shrink-0">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span>🛠️ 我的當前樣式 (即時連動)</span>
            </div>
            <span class="text-[10px] font-medium text-purple-500/80 dark:text-purple-400/80">即時效果</span>
          </div>

          <!-- 樣式隔離注入 -->
          <component :is="'style'">
            {{ scopedUserCss }}
          </component>

          <!-- 畫布內容區 (置中縮放，徹底無滾動條，整件物件一覽無遺) -->
          <div
            class="flex-1 w-full flex items-center justify-center p-2.5 overflow-hidden no-scrollbar bg-slate-50/60 dark:bg-slate-950/60"
            style="background-image: radial-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px); background-size: 14px 14px;"
          >
            <div class="sticky-user-scope w-full flex justify-center scale-75 sm:scale-80 md:scale-85 origin-center shrink-0">
              <div v-html="mission.htmlTemplate"></div>
            </div>
          </div>
        </div>

        <!-- 右欄：🎯 設計師目標樣式 (滿分標準參考) -->
        <div class="flex flex-col rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900 overflow-hidden shadow-xs h-64 sm:h-72">
          <!-- 獨立頂部標籤列（非 absolute 覆蓋，徹底避免遮蔽畫面物件） -->
          <div class="px-3 py-1.5 bg-emerald-50/90 dark:bg-emerald-950/60 border-b border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
            <div class="flex items-center gap-1.5">
              <Target class="w-3.5 h-3.5 text-emerald-500" />
              <span>🎯 設計師目標樣式 (滿分解)</span>
            </div>
            <span class="text-[10px] font-medium text-emerald-600/80 dark:text-emerald-400/80">滿分參考</span>
          </div>

          <!-- 目標樣式隔離注入 -->
          <component :is="'style'">
            {{ scopedTargetCss }}
          </component>

          <!-- 畫布內容區 (置中縮放，徹底無滾動條，整件物件一覽無遺) -->
          <div
            class="flex-1 w-full flex items-center justify-center p-2.5 overflow-hidden no-scrollbar bg-slate-50/60 dark:bg-slate-950/60"
            style="background-image: radial-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px); background-size: 14px 14px;"
          >
            <div class="sticky-target-scope w-full flex justify-center scale-75 sm:scale-80 md:scale-85 origin-center shrink-0">
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
          <span>📝 即時生成的 CSS 代碼（含白話生活化註解）</span>
          <span class="text-purple-400">已自動同步當前設定</span>
        </div>
        <pre class="leading-relaxed whitespace-pre-wrap select-text text-emerald-300">{{ currentCss }}</pre>
      </div>
    </div>
  </aside>
</template>
