<script setup>
import { RotateCcw, Sparkles, BookOpenCheck, Award } from 'lucide-vue-next'

const props = defineProps({
  isEvaluating: { type: Boolean, default: false },
  currentScore: { type: Number, default: 0 }
})

const emit = defineEmits(['resetMission', 'openTargetModal', 'submitEvaluation'])
</script>

<template>
  <!-- 吸附在畫面底部：工具箱很長時，評分按鈕仍隨時按得到 -->
  <div class="sticky bottom-3 z-20 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-900/5 flex items-center justify-between gap-2 sm:gap-4">
    <!-- 左側次要操作 -->
    <div class="flex items-center gap-2">
      <button
        @click="emit('resetMission')"
        class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800 transition-colors"
        title="清除目前所有美化，重置為初始陽春狀態"
        aria-label="重置陽春版"
      >
        <RotateCcw class="w-4 h-4" />
        <span class="hidden sm:inline">重置陽春版</span>
      </button>

      <button
        @click="emit('openTargetModal')"
        class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800 transition-colors"
        title="查看設計師 Target 樣板規格與祕笈"
      >
        <BookOpenCheck class="w-4 h-4 text-purple-500" />
        <span class="hidden sm:inline">設計師 Target 祕笈</span>
        <span class="sm:hidden">祕笈</span>
      </button>
    </div>

    <!-- 右側主要操作：交由 AI 綜合評分 -->
    <div class="flex items-center gap-3">
      <div v-if="currentScore > 0" class="text-right hidden sm:block">
        <span class="block text-[10px] text-slate-400 font-bold uppercase">目前最高得分</span>
        <span class="text-sm font-black text-amber-500">{{ currentScore }} 分</span>
      </div>

      <button
        @click="emit('submitEvaluation')"
        :disabled="isEvaluating"
        class="px-4 sm:px-6 py-2.5 rounded-xl whitespace-nowrap bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500 text-white font-black text-sm flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <Award class="w-5 h-5 text-amber-300" />
        <span>{{ isEvaluating ? 'AI 綜合評審中...' : '交由 AI 評分' }}</span>
      </button>
    </div>
  </div>
</template>
