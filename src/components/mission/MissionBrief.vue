<script setup>
import { ref } from 'vue'
import { Trophy, HelpCircle, CheckCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  mission: { type: Object, required: true },
  checklistStatus: { type: Array, required: true },
  isCompleted: { type: Boolean, required: true }
})

const showHints = ref(false)
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-xs dark:shadow-none transition-colors duration-200">
    <!-- Header: Title & Badges -->
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-300">
            {{ mission.lessonTag }}
          </span>
          <span class="rounded-md border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 px-2 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
            {{ mission.badge }}
          </span>
        </div>
        <h1 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {{ mission.title }}
        </h1>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
          {{ mission.subtitle }}
        </p>
      </div>

      <!-- Completion Badge -->
      <div v-if="isCompleted" class="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-600 dark:text-emerald-300 shadow-xs animate-pulse">
        <Trophy class="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
        <span class="text-xs font-bold">任務已達成！</span>
      </div>
    </div>

    <!-- Scenario Description -->
    <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800/80 dark:bg-slate-950/60 p-3.5 text-xs sm:text-sm leading-relaxed dark:text-slate-300">
      <span class="font-semibold text-purple-600 dark:text-purple-400">💡 課堂情境：</span>
      {{ mission.scenario }}
    </div>

    <!-- Checklist -->
    <div class="mt-4">
      <div class="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        通關檢核目標 (Checklist)
      </div>
      <div class="grid gap-2 sm:grid-cols-2">
        <div
          v-for="item in checklistStatus"
          :key="item.id"
          class="flex items-center gap-2 rounded-lg border p-2.5 text-xs transition-all"
          :class="item.passed ? 'border-emerald-500/40 bg-emerald-50/80 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300 font-medium' : 'border-slate-200 bg-slate-50/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400'"
        >
          <CheckCircle class="h-4 w-4 shrink-0" :class="item.passed ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- Hints Accordion -->
    <div class="mt-4 border-t border-slate-200 dark:border-slate-800/60 pt-3">
      <button
        @click="showHints = !showHints"
        class="flex w-full items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
      >
        <span class="flex items-center gap-1.5">
          <HelpCircle class="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
          避坑指南與核心解題提示 ({{ mission.hints.length }} 則提示)
        </span>
        <component :is="showHints ? ChevronUp : ChevronDown" class="h-4 w-4" />
      </button>

      <div v-if="showHints" class="mt-3 space-y-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 p-3 border border-purple-200 dark:border-purple-500/20 text-xs text-slate-700 dark:text-slate-300">
        <div v-for="(hint, idx) in mission.hints" :key="idx" class="flex items-start gap-2">
          <AlertCircle class="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <span>{{ hint }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
