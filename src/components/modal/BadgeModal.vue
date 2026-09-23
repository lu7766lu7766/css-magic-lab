<script setup>
import { computed } from 'vue'
import { 
  X, 
  Award, 
  Sparkles, 
  MousePointerClick, 
  CreditCard, 
  LayoutGrid, 
  ShieldCheck, 
  Crown, 
  Wand2, 
  Trophy, 
  Lock 
} from 'lucide-vue-next'
import { BADGES, TITLE_RANKS, getRankByExp } from '../../data/badges.js'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  stats: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const currentRank = computed(() => getRankByExp(props.stats.totalExp || 0))

const iconMap = {
  Sparkles,
  MousePointerClick,
  CreditCard,
  LayoutGrid,
  ShieldCheck,
  Crown,
  Wand2,
  Trophy
}

function getIcon(name) {
  return iconMap[name] || Trophy
}

const evaluatedBadges = computed(() => {
  return BADGES.map(b => {
    const isUnlocked = b.isUnlocked(props.stats)
    return {
      ...b,
      unlocked: isUnlocked
    }
  })
})

const unlockedCount = computed(() => {
  return evaluatedBadges.value.filter(b => b.unlocked).length
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- 背景遮罩 -->
    <div @click="emit('close')" class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"></div>

    <!-- 彈窗內容 -->
    <div class="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden z-10 max-h-[85vh] flex flex-col animate-scale-up">
      <!-- 關閉按鈕 -->
      <button
        @click="emit('close')"
        class="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- 標題與當前段位資訊 -->
      <div class="flex items-center gap-3 mb-6">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
          <Trophy class="w-6 h-6" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-black text-slate-900 dark:text-white">
              美感榮譽陳列室
            </h3>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              已解鎖 {{ unlockedCount }} / {{ BADGES.length }}
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            目前段位：<span class="font-bold" :class="currentRank.color">{{ currentRank.title }}</span>（累積 {{ stats.totalExp || 0 }} EXP）
          </p>
        </div>
      </div>

      <!-- 徽章網格列表 -->
      <div class="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="badge in evaluatedBadges"
          :key="badge.id"
          class="p-4 rounded-2xl border transition-all flex items-start gap-3.5 relative overflow-hidden"
          :class="[
            badge.unlocked
              ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 shadow-xs'
              : 'bg-slate-100/60 dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-800/50 opacity-60'
          ]"
        >
          <!-- 徽章圖示 -->
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
            :class="[
              badge.unlocked
                ? `bg-gradient-to-tr ${badge.color} text-white`
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500'
            ]"
          >
            <component :is="getIcon(badge.icon)" class="w-5 h-5" />
          </div>

          <!-- 徽章文字 -->
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-1 mb-1">
              <h4 class="text-xs font-black text-slate-900 dark:text-white truncate">
                {{ badge.title }}
              </h4>
              <span
                class="text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0"
                :class="badge.unlocked ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
              >
                {{ badge.unlocked ? '已獲得' : '未解鎖' }}
              </span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-1.5">
              {{ badge.description }}
            </p>
            <span class="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
              🎯 條件：{{ badge.requirement }}
            </span>
          </div>
        </div>
      </div>

      <!-- 底部按鈕 -->
      <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
        <button
          @click="emit('close')"
          class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
        >
          關閉陳列室
        </button>
      </div>
    </div>
  </div>
</template>
