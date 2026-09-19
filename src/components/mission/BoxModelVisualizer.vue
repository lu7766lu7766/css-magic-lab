<script setup>
import { computed } from 'vue'
import { Layers, AlertTriangle, ShieldCheck } from 'lucide-vue-next'

const props = defineProps({
  boxSizing: { type: String, default: 'content-box' },
  padding: { type: Number, default: 20 },
  borderWidth: { type: Number, default: 2 },
  margin: { type: Number, default: 16 },
  contentWidth: { type: Number, default: 280 }
})

// 計算實際渲染於螢幕上的總寬度
const totalRenderedWidth = computed(() => {
  if (props.boxSizing === 'border-box') {
    return props.contentWidth
  } else {
    return props.contentWidth + (props.padding * 2) + (props.borderWidth * 2)
  }
})

// 計算內容核心實際分配到的寬度
const actualContentWidth = computed(() => {
  if (props.boxSizing === 'border-box') {
    return Math.max(40, props.contentWidth - (props.padding * 2) - (props.borderWidth * 2))
  } else {
    return props.contentWidth
  }
})

const isOverflowing = computed(() => {
  return props.boxSizing === 'content-box' && totalRenderedWidth.value > 300
})
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/80 p-4 shadow-xs dark:shadow-none transition-colors duration-200">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <Layers class="h-4 w-4 text-amber-500 dark:text-amber-400" />
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">洋蔥盒模型即時解剖</h3>
      </div>
      <div class="flex items-center gap-1.5">
        <span
          class="rounded px-2 py-0.5 text-xs font-mono font-bold"
          :class="boxSizing === 'border-box' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'"
        >
          {{ boxSizing }}
        </span>
      </div>
    </div>

    <!-- Nested Onion Box Representation -->
    <div class="flex flex-col items-center justify-center p-3">
      
      <!-- Margin Layer (Orange) -->
      <div
        class="w-full max-w-xs rounded-xl border border-dashed border-amber-500/60 bg-amber-500/10 p-3 text-center transition-all duration-300"
      >
        <div class="flex justify-between items-center text-[10px] font-bold text-amber-500 dark:text-amber-400 mb-1">
          <span>MARGIN (外邊距)</span>
          <span class="font-mono">{{ margin }}px</span>
        </div>

        <!-- Border Layer (Yellow) -->
        <div
          class="rounded-lg border-2 border-yellow-400/80 bg-yellow-400/15 p-3 transition-all duration-300"
        >
          <div class="flex justify-between items-center text-[10px] font-bold text-amber-600 dark:text-yellow-300 mb-1">
            <span>BORDER (邊框)</span>
            <span class="font-mono">{{ borderWidth }}px</span>
          </div>

          <!-- Padding Layer (Green) -->
          <div
            class="rounded-md border border-emerald-500/60 bg-emerald-500/20 p-3 transition-all duration-300"
          >
            <div class="flex justify-between items-center text-[10px] font-bold text-emerald-700 dark:text-emerald-300 mb-1">
              <span>PADDING (內留白)</span>
              <span class="font-mono">{{ padding }}px</span>
            </div>

            <!-- Content Core (Blue) -->
            <div
              class="rounded border border-sky-400/80 bg-sky-500/30 py-2.5 px-3 text-center transition-all duration-300"
            >
              <div class="text-[10px] font-bold text-sky-800 dark:text-sky-200">CONTENT (內容區)</div>
              <div class="font-mono text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">
                {{ actualContentWidth }}px
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- Math Calculation Breakdown -->
    <div class="mt-3 rounded-xl border p-3 text-xs" :class="isOverflowing ? 'border-rose-500/40 bg-rose-50/80 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200' : 'border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200'">
      <div class="flex items-center gap-1.5 font-bold mb-1">
        <component :is="isOverflowing ? AlertTriangle : ShieldCheck" class="h-4 w-4 shrink-0" :class="isOverflowing ? 'text-rose-500 dark:text-rose-400' : 'text-emerald-500 dark:text-emerald-400'" />
        <span>{{ isOverflowing ? '破版警報！螢幕總佔用寬度已超出容器' : '排版安全！寬度受到精確控制' }}</span>
      </div>

      <div class="font-mono text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 mt-1">
        <template v-if="boxSizing === 'content-box'">
          總寬度 = width ({{ contentWidth }}) + padding ({{ padding }}*2) + border ({{ borderWidth }}*2)
          = <strong class="text-rose-600 dark:text-rose-400 text-xs">{{ totalRenderedWidth }}px</strong>
        </template>
        <template v-else>
          總寬度 = 宣告 width <strong class="text-emerald-600 dark:text-emerald-400 text-xs">{{ totalRenderedWidth }}px</strong>（內容自動收縮至 {{ actualContentWidth }}px，絕不外凸！）
        </template>
      </div>
    </div>
  </div>
</template>
