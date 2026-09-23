<script setup>
import { ref, computed } from 'vue'
import { 
  Monitor, 
  Smartphone, 
  Copy, 
  Check, 
  Sparkles, 
  Pipette, 
  Code2, 
  Target, 
  AlertCircle,
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-vue-next'
import { scopeCss } from '../../data/cssGenerators.js'

const props = defineProps({
  mission: { type: Object, required: true },
  currentCss: { type: String, required: true },
  hasRecentChange: { type: Boolean, default: false }
})

const emit = defineEmits(['copyColor'])

const previewDevice = ref('desktop') // 'desktop' | 'mobile'
const isCopied = ref(false)
const copiedColor = ref(null)
const layoutMode = ref('split') // 'split' (雙大圖) | 'triple' (三欄)
const isCssDrawerOpen = ref(true)

function copyCss() {
  navigator.clipboard.writeText(props.currentCss)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

function handleCopyColor(hex) {
  navigator.clipboard.writeText(hex)
  copiedColor.value = hex
  emit('copyColor', hex)
  setTimeout(() => {
    copiedColor.value = null
  }, 2000)
}

// 樣式作用域隔離：確保使用者調整與設計師目標畫布互不干擾
const scopedUserCss = computed(() => scopeCss(props.currentCss, 'user-workbench-canvas'))
const scopedTargetCss = computed(() => scopeCss(props.mission.designerTargetCss, 'target-workbench-canvas'))

// 格式化當前 CSS 每一行
const formattedLines = computed(() => {
  const rawLines = props.currentCss.split('\n')
  return rawLines.map((line, index) => {
    let code = line
    let explanation = ''

    const commentMatch = line.match(/\/\*\s*(.*?)\s*\*\//)
    if (commentMatch) {
      explanation = commentMatch[1]
      code = line.replace(/\/\*.*?\*\//, '').trimEnd()
    }

    return {
      lineNumber: index + 1,
      code,
      explanation,
      isCommentOnly: line.trim().startsWith('/*') && line.trim().endsWith('*/')
    }
  })
})
</script>

<template>
  <div class="space-y-3">
    <!-- 頂部視圖切換列 -->
    <div class="flex flex-wrap items-center justify-between gap-2 px-1">
      <div class="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
        <Sparkles class="w-4 h-4 text-purple-500" />
        <span>視覺魔法對照舞台</span>
        <span class="text-[11px] font-normal text-slate-400">（即時連動反饋）</span>
      </div>

      <div class="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-semibold">
        <button
          @click="layoutMode = 'split'"
          class="px-3 py-1 rounded-lg transition-all flex items-center gap-1"
          :class="layoutMode === 'split' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'"
        >
          <span>🎨 雙畫布大圖 (推薦)</span>
        </button>
        <button
          @click="layoutMode = 'triple'"
          class="px-3 py-1 rounded-lg transition-all flex items-center gap-1"
          :class="layoutMode === 'triple' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'"
        >
          <span>💻 三欄全覽 (含代碼)</span>
        </button>
      </div>
    </div>

    <!-- 主工作網格 -->
    <div class="grid grid-cols-1 gap-4 items-stretch" :class="layoutMode === 'split' ? 'xl:grid-cols-2' : 'xl:grid-cols-12'">
      <!-- ==================== 左側：當前樣式（我的作品） ==================== -->
      <div
        class="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden h-85 sm:h-90"
        :class="layoutMode === 'split' ? 'w-full' : 'xl:col-span-4'"
      >
        <!-- 頂部標籤與設備切換 -->
        <div class="px-3.5 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <span class="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-1">
              <span>🛠️ 我的當前樣式</span>
              <span class="text-[10px] font-bold text-purple-600 dark:text-purple-400">(即時反饋)</span>
            </span>
          </div>

          <div class="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/80 p-0.5 rounded-lg text-xs">
            <button
              @click="previewDevice = 'desktop'"
              class="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              :class="{ 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs': previewDevice === 'desktop' }"
              title="桌面寬度"
            >
              <Monitor class="w-3.5 h-3.5" />
            </button>
            <button
              @click="previewDevice = 'mobile'"
              class="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              :class="{ 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs': previewDevice === 'mobile' }"
              title="手機寬度 (375px)"
            >
              <Smartphone class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- 渲染畫布容器 (定高且內容置中) -->
        <div
          class="flex-1 p-4 flex items-center justify-center bg-slate-100/70 dark:bg-slate-950/70 overflow-auto relative"
          style="background-image: radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px); background-size: 16px 16px;"
        >
          <!-- 注入使用者目前的 CSS (使用 user-workbench-canvas 作用域隔離) -->
          <component :is="'style'">
            {{ scopedUserCss }}
          </component>

          <div
            class="transition-all duration-300 flex items-center justify-center w-full"
            :class="[
              previewDevice === 'mobile' ? 'max-w-[320px] border-2 border-dashed border-slate-300 dark:border-slate-700 p-2 rounded-2xl' : 'max-w-md',
              hasRecentChange ? 'element-glow-pulse' : ''
            ]"
          >
            <div class="user-workbench-canvas w-full flex justify-center" v-html="mission.htmlTemplate"></div>
          </div>
        </div>

        <!-- 底部提示 -->
        <div class="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between shrink-0">
          <span>💡 支援直接用滑鼠 Hover 測試</span>
          <span class="text-purple-500 font-bold">即時響應</span>
        </div>
      </div>

      <!-- ==================== 中間：CSS 即時檢閱 (三欄模式下顯示在中央) ==================== -->
      <div
        v-if="layoutMode === 'triple'"
        class="xl:col-span-4 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-sm overflow-hidden font-mono text-xs h-85 sm:h-90"
      >
        <!-- 頂部工具列 -->
        <div class="px-3.5 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <Code2 class="w-4 h-4 text-purple-400" />
            <span class="font-bold text-slate-200 text-xs font-sans">
              📝 style.css 即時檢閱
            </span>
          </div>

          <button
            @click="copyCss"
            class="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-sans text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800"
          >
            <Check v-if="isCopied" class="w-3 h-3 text-emerald-400" />
            <Copy v-else class="w-3 h-3" />
            <span>{{ isCopied ? '已複製' : '複製代碼' }}</span>
          </button>
        </div>

        <!-- 代碼與生活化註解清單 -->
        <div class="flex-1 p-3 overflow-y-auto overflow-x-auto space-y-1 bg-slate-950/90 leading-relaxed select-text">
          <div
            v-for="item in formattedLines"
            :key="item.lineNumber"
            class="flex items-start gap-2 hover:bg-slate-900/60 px-1 py-0.5 rounded transition-colors"
          >
            <span class="w-5 shrink-0 text-slate-600 select-none text-right text-[11px]">
              {{ item.lineNumber }}
            </span>

            <div class="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">
              <span
                :class="[
                  item.isCommentOnly ? 'text-slate-500 italic' :
                  item.code.includes('{') || item.code.includes('}') ? 'text-purple-300 font-bold' :
                  item.code.includes(':') ? 'text-emerald-300' : 'text-slate-200'
                ]"
              >
                {{ item.code }}
              </span>

              <span
                v-if="item.explanation"
                class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-sans font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-800/80 shadow-xs"
              >
                <span>{{ item.explanation }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- 底部白話標籤提示 -->
        <div class="px-3.5 py-1.5 bg-slate-950 border-t border-slate-800/80 text-[10px] font-sans text-slate-400 flex items-center justify-between shrink-0">
          <span>💡 調整下方工具箱，代碼即時聯動</span>
          <span class="text-purple-400 font-semibold">內部滾動條已優化</span>
        </div>
      </div>

      <!-- ==================== 右側：目標樣式（設計師樣板） ==================== -->
      <div
        class="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden h-85 sm:h-90"
        :class="layoutMode === 'split' ? 'w-full' : 'xl:col-span-4'"
      >
        <!-- 頂部標題 -->
        <div class="px-3.5 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <Target class="w-4 h-4 text-emerald-500" />
            <span class="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-1">
              <span>🎯 設計師目標樣式</span>
              <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">(滿分標準)</span>
            </span>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            標準參考解
          </span>
        </div>

        <!-- 渲染目標成品畫布 -->
        <div
          class="flex-1 p-4 flex items-center justify-center bg-slate-100/70 dark:bg-slate-950/70 overflow-auto relative"
          style="background-image: radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px); background-size: 16px 16px;"
        >
          <!-- 注入設計師 Target CSS (使用 target-workbench-canvas 命名空間隔離) -->
          <component :is="'style'">
            {{ scopedTargetCss }}
          </component>

          <div class="target-workbench-canvas w-full flex justify-center" v-html="mission.htmlTemplate"></div>
        </div>

        <!-- 目標情報卡（色碼滴管 + 關鍵尺寸） -->
        <div class="p-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs shrink-0">
          <!-- 色彩滴管列表 -->
          <div v-if="mission.targetInspector?.colors" class="flex flex-wrap items-center gap-1.5">
            <div class="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
              <Pipette class="w-3 h-3 text-purple-500" />
              <span class="text-[10px]">目標吸管：</span>
            </div>
            <button
              v-for="c in mission.targetInspector.colors.slice(0, 3)"
              :key="c.hex"
              type="button"
              @click="handleCopyColor(c.hex)"
              class="flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-purple-400 transition-all text-[10px] font-mono"
              :title="`點擊吸取 ${c.label}`"
            >
              <span class="w-2.5 h-2.5 rounded-full" :style="{ background: c.hex }"></span>
              <span class="font-bold text-slate-700 dark:text-slate-300">{{ c.hex }}</span>
              <Check v-if="copiedColor === c.hex" class="w-2.5 h-2.5 text-emerald-500" />
            </button>
          </div>

          <!-- 關鍵尺寸與造型提示 -->
          <div v-if="mission.targetInspector?.metrics" class="flex items-center gap-1 text-[10px] font-sans text-slate-500 dark:text-slate-400 truncate">
            <span class="font-bold text-slate-700 dark:text-slate-300">關鍵指標：</span>
            <span v-for="(m, i) in mission.targetInspector.metrics.slice(0, 3)" :key="i" class="truncate">
              {{ m.label }} {{ m.value }}；
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 雙大圖模式下的折疊式 CSS 代碼抽屜 (不佔據垂直版面，想看點開即可) -->
    <div v-if="layoutMode === 'split'" class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-sm transition-all duration-300">
      <div
        @click="isCssDrawerOpen = !isCssDrawerOpen"
        class="px-4 py-2.5 bg-slate-950 flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-colors select-none"
      >
        <div class="flex items-center gap-2">
          <Code2 class="w-4 h-4 text-purple-400" />
          <span class="font-bold text-xs text-slate-200 font-sans">
            📝 style.css 即時檢閱抽屜
          </span>
          <span class="text-[11px] text-slate-400 font-sans">
            {{ isCssDrawerOpen ? '(點擊收合)' : '(點擊展開查看帶白話生活註解的即時代碼)' }}
          </span>
        </div>

        <div class="flex items-center gap-2 text-xs font-sans">
          <button
            @click.stop="copyCss"
            class="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800"
          >
            <Check v-if="isCopied" class="w-3 h-3 text-emerald-400" />
            <Copy v-else class="w-3 h-3" />
            <span>{{ isCopied ? '已複製' : '複製' }}</span>
          </button>
          <span class="text-purple-400 font-semibold text-[11px]">
            {{ isCssDrawerOpen ? '▲ 收合代碼' : '▼ 展開代碼' }}
          </span>
        </div>
      </div>

      <!-- 抽屜內容 -->
      <div v-show="isCssDrawerOpen" class="p-3 bg-slate-950/90 font-mono text-xs max-h-56 overflow-y-auto space-y-1 border-t border-slate-800">
        <div
          v-for="item in formattedLines"
          :key="item.lineNumber"
          class="flex items-start gap-2 hover:bg-slate-900/60 px-1 py-0.5 rounded transition-colors"
        >
          <span class="w-5 shrink-0 text-slate-600 select-none text-right text-[11px]">
            {{ item.lineNumber }}
          </span>
          <div class="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">
            <span
              :class="[
                item.isCommentOnly ? 'text-slate-500 italic' :
                item.code.includes('{') || item.code.includes('}') ? 'text-purple-300 font-bold' :
                item.code.includes(':') ? 'text-emerald-300' : 'text-slate-200'
              ]"
            >
              {{ item.code }}
            </span>
            <span
              v-if="item.explanation"
              class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-sans font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-800/80 shadow-xs"
            >
              <span>{{ item.explanation }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

