<script setup>
import { ref, watch, computed } from 'vue'
import { Eye, Smartphone, Monitor, RefreshCw, Sparkles, AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  mission: { type: Object, required: true },
  currentCss: { type: String, required: true },
  hasRecentChange: { type: Boolean, default: false }
})

const viewMode = ref('after') // 'after' | 'before'
const previewDevice = ref('desktop') // 'desktop' | 'mobile'

// 是否觸發微光聚焦
const isPulsing = ref(false)

watch(
  () => props.hasRecentChange,
  (val) => {
    if (val) {
      isPulsing.value = true
      setTimeout(() => {
        isPulsing.value = false
      }, 1800)
    }
  }
)

const activeCss = computed(() => {
  if (viewMode.value === 'before') {
    return props.mission.initialCss
  }
  return props.currentCss
})
</script>

<template>
  <div class="flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
    <!-- 畫布頂部控制工具列 -->
    <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
      <!-- 檢視模式切換：即時成果 vs 陽春原版 -->
      <div class="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 text-xs">
        <button
          @click="viewMode = 'after'"
          class="flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all"
          :class="[
            viewMode === 'after'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          ]"
        >
          <Sparkles class="w-3.5 h-3.5" />
          <span>美化成果 (After)</span>
        </button>
        <button
          @click="viewMode = 'before'"
          class="flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all"
          :class="[
            viewMode === 'before'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          ]"
        >
          <AlertTriangle class="w-3.5 h-3.5" />
          <span>陽春原版 (Before)</span>
        </button>
      </div>

      <!-- 螢幕尺寸切換 (RWD 預覽) -->
      <div class="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/80 p-1 rounded-xl text-xs">
        <button
          @click="previewDevice = 'desktop'"
          class="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          :class="{ 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs': previewDevice === 'desktop' }"
          title="桌面寬度"
        >
          <Monitor class="w-4 h-4" />
        </button>
        <button
          @click="previewDevice = 'mobile'"
          class="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          :class="{ 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs': previewDevice === 'mobile' }"
          title="手機寬度 (375px)"
        >
          <Smartphone class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- 視覺渲染畫布容器 -->
    <div
      class="flex-1 relative p-6 sm:p-10 flex items-center justify-center min-h-[380px] bg-slate-100/70 dark:bg-slate-950/70 overflow-auto transition-all"
      style="background-image: radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px); background-size: 16px 16px;"
    >
      <!-- 動態注入當前 CSS -->
      <component :is="'style'">
        {{ activeCss }}
      </component>

      <!-- 預覽框體 -->
      <div
        class="transition-all duration-300 flex items-center justify-center w-full"
        :class="[
          previewDevice === 'mobile' ? 'max-w-[375px] border-2 border-dashed border-slate-300 dark:border-slate-700 p-4 rounded-3xl' : 'max-w-2xl',
          isPulsing ? 'element-glow-pulse' : ''
        ]"
      >
        <!-- 真正被 CSS 樣式控制渲染的 HTML 內容 -->
        <div class="preview-stage w-full flex justify-center" v-html="mission.htmlTemplate"></div>
      </div>
    </div>

    <!-- 畫布底端提示列 -->
    <div class="px-4 py-2 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full" :class="viewMode === 'after' ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'"></span>
        <span>當前呈現：{{ viewMode === 'after' ? '即時美化效果（支援互動與 Hover）' : '原始陽春未修改版' }}</span>
      </div>
      <span class="hidden sm:inline">💡 元件修改時會產生微光外框聚焦</span>
    </div>
  </div>
</template>
