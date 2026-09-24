<script setup>
import { computed } from 'vue'
import { Sparkles, Trophy, Moon, Sun, Award, CheckCircle2, ChevronRight } from 'lucide-vue-next'
import { getRankByExp } from '../../data/badges.js'

const props = defineProps({
  missions: { type: Array, required: true },
  currentMissionIndex: { type: Number, required: true },
  stats: { type: Object, required: true },
  isDark: { type: Boolean, required: true }
})

const emit = defineEmits(['selectMission', 'toggleDark', 'openBadges'])

const currentRank = computed(() => getRankByExp(props.stats.totalExp || 0))

const unlockedBadgesCount = computed(() => {
  return props.stats.unlockedBadges ? props.stats.unlockedBadges.length : 0
})
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
      <!-- 品牌 Logo -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/20 text-white font-black text-xl">
          <Sparkles class="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              CSS 魔法實驗室
            </h1>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              AI 美感養成
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            零基礎專屬 • 陽春介面整容任務
          </p>
        </div>
      </div>

      <!-- 關卡導航選單 (Tabs) -->
      <nav class="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto max-w-[580px] lg:max-w-[720px] no-scrollbar">
        <button
          v-for="(m, idx) in missions"
          :key="m.id"
          @click="emit('selectMission', idx)"
          class="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative shrink-0 whitespace-nowrap"
          :class="[
            currentMissionIndex === idx
              ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          ]"
        >
          <span>第 {{ m.number }} 關</span>
          <span v-if="(stats.scores[m.id] || 0) >= 70" class="text-amber-500 font-bold flex items-center text-[10px]">
            ★{{ stats.stars[m.id] || 1 }}
          </span>
          <span v-else class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
        </button>
      </nav>

      <!-- 右側：美感榮譽、稱號、明暗開關 -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- 稱號與經驗值膠囊 -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
          <Trophy class="w-4 h-4 text-amber-500" />
          <div class="flex flex-col text-left">
            <span class="font-bold text-slate-800 dark:text-slate-200" :class="currentRank.color">
              {{ currentRank.title }}
            </span>
            <span class="text-[10px] text-slate-400">
              {{ stats.totalExp || 0 }} EXP
            </span>
          </div>
        </div>

        <!-- 美感徽章按鈕 -->
        <button
          @click="emit('openBadges')"
          class="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title="美感成就榮譽室"
        >
          <Award class="w-5 h-5 text-purple-500" />
          <span
            v-if="unlockedBadgesCount > 0"
            class="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-purple-600 text-white shadow-sm"
          >
            {{ unlockedBadgesCount }}
          </span>
        </button>

        <!-- 明/暗色系切換按鈕 -->
        <button
          @click="emit('toggleDark')"
          class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title="切換色彩模式"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-amber-400" />
          <Moon v-else class="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  </header>
</template>
