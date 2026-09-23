<script setup>
import { MessageSquareQuote, CheckCircle, Target, ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  mission: { type: Object, required: true },
  score: { type: Number, default: 0 },
  stars: { type: Number, default: 0 }
})
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-pink-500/5 dark:from-purple-950/20 dark:via-indigo-950/20 dark:to-pink-950/20 p-5 sm:p-6 mb-6">
    <!-- 裝飾背景光芒 -->
    <div class="absolute -right-16 -top-16 w-64 h-64 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
      <!-- 關卡標題與客戶委託 -->
      <div class="flex items-start gap-4">
        <!-- 客戶頭像 -->
        <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-3xl shrink-0">
          {{ mission.client.avatar }}
        </div>

        <div class="space-y-1.5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-600 text-white shadow-sm shadow-purple-500/30">
              第 {{ mission.number }} 關
            </span>
            <h2 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {{ mission.title }}
            </h2>
            <div v-if="score >= 70" class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <span>已通過 ★{{ stars }}</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {{ mission.subtitle }}
          </p>

          <!-- 委託人求救對話 -->
          <div class="mt-2 text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2 shadow-xs">
            <MessageSquareQuote class="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <span>{{ mission.client.dialogue }}</span>
          </div>
        </div>
      </div>

      <!-- 核心美學學習標籤 -->
      <div class="lg:max-w-xs shrink-0 bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div class="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          <Target class="w-3.5 h-3.5 text-purple-500" />
          <span>本關美學核心修煉</span>
        </div>
        <ul class="space-y-1">
          <li
            v-for="(item, i) in mission.learningFocus.slice(0, 3)"
            :key="i"
            class="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
            <span class="truncate">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
