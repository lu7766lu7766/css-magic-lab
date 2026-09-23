<script setup>
import { ref, computed } from 'vue'
import { Code2, Copy, Check, Sparkles, BookOpen } from 'lucide-vue-next'

const props = defineProps({
  currentCss: { type: String, required: true },
  recentModifiedProp: { type: String, default: '' }
})

const isCopied = ref(false)

function copyCode() {
  navigator.clipboard.writeText(props.currentCss)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

// 解析 CSS 每一行，分離出代碼與白話註解
const formattedLines = computed(() => {
  const rawLines = props.currentCss.split('\n')
  return rawLines.map((line, index) => {
    let code = line
    let explanation = ''

    // 檢查是否有註解
    const commentMatch = line.match(/\/\*\s*(.*?)\s*\*\//)
    if (commentMatch) {
      explanation = commentMatch[1]
      code = line.replace(/\/\*.*?\*\//, '').trimEnd()
    }

    const isHighlighted = props.recentModifiedProp && line.includes(props.recentModifiedProp)

    return {
      lineNumber: index + 1,
      raw: line,
      code,
      explanation,
      isCommentOnly: line.trim().startsWith('/*') && line.trim().endsWith('*/'),
      isHighlighted
    }
  })
})
</script>

<template>
  <div class="flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-sm overflow-hidden font-mono text-xs">
    <!-- 頂部工具列 -->
    <div class="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
        </div>
        <span class="ml-2 font-bold text-slate-300 flex items-center gap-1.5">
          <Code2 class="w-4 h-4 text-purple-400" />
          <span>style.css 即時檢閱器</span>
        </span>
      </div>

      <div class="flex items-center gap-2">
        <span class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800">
          <Sparkles class="w-3 h-3 text-purple-400" />
          <span>白話原理註解中</span>
        </span>
        <button
          @click="copyCode"
          class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 hover:border-slate-700"
          title="複製 CSS 代碼"
        >
          <Check v-if="isCopied" class="w-3.5 h-3.5 text-emerald-400" />
          <Copy v-else class="w-3.5 h-3.5" />
          <span>{{ isCopied ? '已複製' : '複製代碼' }}</span>
        </button>
      </div>
    </div>

    <!-- 編輯器程式碼內容主區 -->
    <div class="flex-1 p-4 overflow-y-auto overflow-x-auto space-y-1 bg-slate-950/90 leading-relaxed select-text">
      <div
        v-for="item in formattedLines"
        :key="item.lineNumber"
        class="flex items-start gap-3 px-2 py-0.5 rounded-md transition-colors"
        :class="[
          item.isHighlighted ? 'bg-purple-900/40 border-l-2 border-purple-400' : 'hover:bg-slate-900/60'
        ]"
      >
        <!-- 行號 -->
        <span class="w-6 shrink-0 text-slate-600 select-none text-right">
          {{ item.lineNumber }}
        </span>

        <!-- 程式碼與生活化註解 -->
        <div class="flex-1 flex flex-wrap items-center gap-2 min-w-0">
          <span
            :class="[
              item.isCommentOnly ? 'text-slate-500 italic' :
              item.code.includes('{') || item.code.includes('}') ? 'text-purple-300 font-bold' :
              item.code.includes(':') ? 'text-emerald-300' : 'text-slate-200'
            ]"
          >
            {{ item.code }}
          </span>

          <!-- 生活化白話解說標籤 -->
          <span
            v-if="item.explanation"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-sans font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-800/80 shadow-xs"
          >
            <BookOpen class="w-3 h-3 text-indigo-400 shrink-0" />
            <span>{{ item.explanation }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 底部教學引導資訊 -->
    <div class="px-4 py-2 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
      <span>💡 每項意圖或自然語言注入，都會在此顯示直觀的生活化原理註解</span>
      <span class="text-purple-400 font-semibold hidden sm:inline">零黑盒子 • 100% 透明</span>
    </div>
  </div>
</template>
