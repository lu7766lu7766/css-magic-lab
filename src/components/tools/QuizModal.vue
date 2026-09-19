<script setup>
import { ref } from 'vue'
import { X, CheckCircle2, HelpCircle, Trophy, Sparkles } from 'lucide-vue-next'
import confetti from 'canvas-confetti'
import { QUIZ_QUESTIONS } from '../../data/quiz.js'

const props = defineProps({
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])

const selectedAnswers = ref({})
const isSubmitted = ref(false)

function selectOption(qId, key) {
  if (isSubmitted.value) return
  selectedAnswers.value[qId] = key
}

function handleSubmit() {
  isSubmitted.value = true
  // 檢查是否全對
  const allCorrect = QUIZ_QUESTIONS.every(q => selectedAnswers.value[q.id] === q.correctAnswer)
  if (allCorrect) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }
}

function resetQuiz() {
  selectedAnswers.value = {}
  isSubmitted.value = false
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
    <div class="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 p-6 shadow-2xl max-h-[90vh] overflow-y-auto transition-colors duration-200">
      
      <!-- Close Button -->
      <button @click="emit('close')" class="absolute top-4 right-4 rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white">
        <X class="h-5 w-5" />
      </button>

      <!-- Header -->
      <div class="flex items-center gap-2 mb-2">
        <Trophy class="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
        <h2 class="text-lg font-extrabold text-slate-900 dark:text-white">課堂隨堂評量：{{ QUIZ_QUESTIONS.length }} 題核心觀念即測即評</h2>
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-6">檢驗各章節（洋蔥盒模型、選擇器權重、RWD 與 Tailwind、Position 定位、動畫效能）核心觀念吸收成果！</p>

      <!-- Questions List -->
      <div class="space-y-6">
        <div
          v-for="q in QUIZ_QUESTIONS"
          :key="q.id"
          class="rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 p-4 space-y-3 shadow-2xs"
        >
          <div class="text-xs font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
            {{ q.question }}
          </div>

          <!-- Options -->
          <div class="grid gap-2">
            <button
              v-for="opt in q.options"
              :key="opt.key"
              @click="selectOption(q.id, opt.key)"
              class="flex items-center gap-2.5 rounded-lg border p-2.5 text-left text-xs transition-all"
              :class="[
                selectedAnswers[q.id] === opt.key
                  ? isSubmitted
                    ? opt.key === q.correctAnswer
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold'
                      : 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold'
                    : 'border-purple-500 bg-purple-500/15 text-purple-900 dark:text-purple-200 font-bold'
                  : isSubmitted && opt.key === q.correctAnswer
                    ? 'border-emerald-500/50 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700'
              ]"
            >
              <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-[10px] font-bold">
                {{ opt.key }}
              </span>
              <span>{{ opt.text }}</span>
            </button>
          </div>

          <!-- Explanation after submit -->
          <div
            v-if="isSubmitted"
            class="rounded-lg p-3 text-xs leading-relaxed border"
            :class="selectedAnswers[q.id] === q.correctAnswer ? 'border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200' : 'border-rose-500/30 bg-rose-50/80 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200'"
          >
            <div class="font-bold mb-1">
              {{ selectedAnswers[q.id] === q.correctAnswer ? '🎉 恭喜答對！' : '❌ 答錯了，請看解析：' }}
            </div>
            <div class="whitespace-pre-line text-[11px] text-slate-600 dark:text-slate-300">{{ q.explanation }}</div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
        <button
          v-if="isSubmitted"
          @click="resetQuiz"
          class="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:text-white"
        >
          重新作答
        </button>
        <div v-else></div>

        <button
          v-if="!isSubmitted"
          @click="handleSubmit"
          class="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/30"
        >
          提交答案並看解析
        </button>
        <button
          v-else
          @click="emit('close')"
          class="rounded-lg bg-purple-600 px-5 py-2 text-xs font-bold text-white hover:bg-purple-500"
        >
          完成關閉
        </button>
      </div>

    </div>
  </div>
</template>
