<script setup>
import { onMounted, watch } from 'vue'
import { X, Award, Sparkles, CheckCircle2, AlertCircle, AlertTriangle, ArrowRight, RotateCcw, HeartHandshake } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  evalResult: { type: Object, default: () => null },
  hasNextMission: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'nextMission'])

watch(
  () => props.isOpen,
  (val) => {
    if (val && props.evalResult && props.evalResult.isPassed) {
      triggerConfetti()
    }
  }
)

function triggerConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  })
}
</script>

<template>
  <div v-if="isOpen && evalResult" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- 背景遮罩 -->
    <div @click="emit('close')" class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"></div>

    <!-- 評分彈窗核心容器 -->
    <div class="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-scale-up">
      <!-- 頂部光芒裝飾 -->
      <div
        class="absolute -top-20 -left-20 w-52 h-52 rounded-full blur-3xl pointer-events-none"
        :class="evalResult.isPassed ? 'bg-purple-500/20 dark:bg-purple-600/30' : 'bg-amber-500/20'"
      ></div>

      <!-- 關閉按鈕 -->
      <button
        @click="emit('close')"
        class="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- 評分標題與星級 -->
      <div class="text-center space-y-3 mb-6">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
          <Award class="w-9 h-9 text-amber-300" />
        </div>

        <div>
          <span class="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
            {{ evalResult.isPassed ? '美感驗證通過 🎉' : '尚未及格 • 繼續加油 💪' }}
          </span>
          <div class="flex items-center justify-center gap-1 mt-1 text-3xl font-black text-amber-400">
            <span v-for="i in 3" :key="i" class="transition-transform duration-300">
              {{ i <= evalResult.stars ? '★' : '☆' }}
            </span>
          </div>
        </div>

        <div class="flex items-baseline justify-center gap-1">
          <span class="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {{ evalResult.score }}
          </span>
          <span class="text-sm font-bold text-slate-400">/ 100 分</span>
        </div>
      </div>

      <!-- 4 大維度指標長條圖 -->
      <div class="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 mb-5 text-xs">
        <!-- 色彩調和 -->
        <div>
          <div class="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span>色彩調和 (Color Harmony)</span>
            <span class="text-purple-500">{{ evalResult.dimensions.colorHarmony }}%</span>
          </div>
          <div class="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full bg-purple-500 transition-all duration-500" :style="{ width: `${evalResult.dimensions.colorHarmony}%` }"></div>
          </div>
        </div>

        <!-- 空間呼吸 -->
        <div>
          <div class="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span>空間呼吸 (Whitespace & Padding)</span>
            <span class="text-blue-500">{{ evalResult.dimensions.whitespace }}%</span>
          </div>
          <div class="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full bg-blue-500 transition-all duration-500" :style="{ width: `${evalResult.dimensions.whitespace}%` }"></div>
          </div>
        </div>

        <!-- 邊界光影 -->
        <div>
          <div class="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span>邊界與立體光影 (Elevation)</span>
            <span class="text-pink-500">{{ evalResult.dimensions.elevation }}%</span>
          </div>
          <div class="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full bg-pink-500 transition-all duration-500" :style="{ width: `${evalResult.dimensions.elevation}%` }"></div>
          </div>
        </div>

        <!-- 文字階層 -->
        <div>
          <div class="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span>文字與結構階層 (Hierarchy)</span>
            <span class="text-emerald-500">{{ evalResult.dimensions.hierarchy }}%</span>
          </div>
          <div class="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full bg-emerald-500 transition-all duration-500" :style="{ width: `${evalResult.dimensions.hierarchy}%` }"></div>
          </div>
        </div>
      </div>

      <!-- 設計師總評 -->
      <div class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-3.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 mb-5 flex items-start gap-2.5">
        <Sparkles class="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
        <p class="leading-relaxed">{{ evalResult.critique }}</p>
      </div>

      <!-- ⚠️ 評分警告提示（誤觸干擾項時才提示） -->
      <div
        v-if="evalResult.trapWarnings && evalResult.trapWarnings.length > 0"
        class="text-xs p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-200 mb-5 space-y-2"
      >
        <div class="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-300">
          <AlertTriangle class="w-4 h-4 text-rose-500 shrink-0" />
          <span>美感警示：偵測到誤啟用了 {{ evalResult.trapWarnings.length }} 項不推薦的干擾樣式</span>
        </div>
        <ul class="list-disc list-inside space-y-1 pl-1 text-[11px] leading-relaxed">
          <li v-for="(item, i) in evalResult.trapWarnings" :key="i">
            <span class="font-bold">{{ item.name }}</span>：{{ item.warning }}
          </li>
        </ul>
        <p class="text-[10px] text-rose-600 dark:text-rose-400 pt-0.5">
          💡 建議：回到工具箱找到上述按鈕「再點一下」關閉還原，評分即可大幅提升！
        </p>
      </div>

      <!-- 💡 救命錦囊（未滿 70 分時觸發） -->
      <div
        v-if="evalResult.rescueHint"
        class="text-xs p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-200 mb-5 flex items-start gap-2.5"
      >
        <AlertCircle class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span class="font-bold block mb-0.5">💡 救命錦囊指引：</span>
          <p class="leading-relaxed">{{ evalResult.rescueHint }}</p>
        </div>
      </div>

      <!-- 底部按鈕 -->
      <div class="flex items-center justify-end gap-3 pt-2">
        <button
          @click="emit('close')"
          class="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {{ evalResult.isPassed ? '留在此關微調' : '關閉並修改' }}
        </button>

        <button
          v-if="evalResult.isPassed && hasNextMission"
          @click="emit('nextMission')"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
        >
          <span>前往下一關</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
