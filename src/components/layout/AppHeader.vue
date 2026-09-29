<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Sparkles, Trophy, Moon, Sun, Award, CheckCircle2, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-vue-next'
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

const currentMission = computed(() => {
  return props.missions[props.currentMissionIndex] || props.missions[0]
})

const navRef = ref(null)
const buttonRefs = ref([])
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const isMobileMenuOpen = ref(false)

function setButtonRef(el, idx) {
  if (el) {
    buttonRefs.value[idx] = el
  }
}

function updateScrollButtons() {
  if (!navRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = navRef.value
  console.log('NAV SCROLL INFO:', { scrollLeft, scrollWidth, clientWidth, diff: scrollWidth - clientWidth })
  canScrollLeft.value = scrollLeft > 2
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 2
}

function scrollNav(direction) {
  if (!navRef.value) return
  const offset = direction === 'left' ? -180 : 180
  navRef.value.scrollBy({ left: offset, behavior: 'smooth' })
  setTimeout(updateScrollButtons, 320)
}

function onNavWheel(e) {
  if (!navRef.value) return
  const { scrollWidth, clientWidth } = navRef.value
  if (scrollWidth > clientWidth) {
    navRef.value.scrollLeft += e.deltaY
    updateScrollButtons()
  }
}

function scrollToActive(smooth = true) {
  nextTick(() => {
    if (!navRef.value) return
    const activeEl = buttonRefs.value[props.currentMissionIndex]
    if (!activeEl) return

    const container = navRef.value
    const targetScroll = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2)
    container.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: smooth ? 'smooth' : 'auto'
    })
    setTimeout(updateScrollButtons, 320)
  })
}

watch(() => props.currentMissionIndex, () => {
  scrollToActive(true)
})

onMounted(() => {
  updateScrollButtons()
  scrollToActive(false)
  window.addEventListener('resize', updateScrollButtons)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScrollButtons)
})
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
      <!-- 品牌 Logo -->
      <div class="flex items-center gap-3 shrink-0">
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
          <p class="text-xs text-slate-500 dark:text-slate-400 hidden 2xl:block">
            零基礎專屬 • 陽春介面整容任務
          </p>
        </div>
      </div>

      <!-- 關卡導航選單 (Tabs) 容器 - 桌面與平板端 -->
      <div class="hidden md:flex items-center gap-1 min-w-0 flex-1 max-w-[840px] justify-center mx-1">
        <!-- 左滾動按鈕 -->
        <button
          v-show="canScrollLeft"
          @click="scrollNav('left')"
          type="button"
          class="shrink-0 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-slate-800 shadow-xs transition-all cursor-pointer"
          title="向左滾動關卡"
        >
          <ChevronLeft class="w-3.5 h-3.5" />
        </button>

        <!-- 導航選單 -->
        <nav
          ref="navRef"
          @scroll="updateScrollButtons"
          @wheel.prevent="onNavWheel"
          class="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar scroll-smooth w-full"
        >
          <button
            v-for="(m, idx) in missions"
            :key="m.id"
            :ref="el => setButtonRef(el, idx)"
            @click="emit('selectMission', idx)"
            type="button"
            class="flex items-center gap-0.5 px-1.5 sm:px-2 py-1.5 rounded-lg text-xs font-semibold transition-all relative shrink-0 whitespace-nowrap cursor-pointer"
            :class="[
              currentMissionIndex === idx
                ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm ring-1 ring-purple-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
            ]"
          >
            <span>第 {{ m.number }} 關</span>
            <span v-if="(stats.scores[m.id] || 0) >= 70" class="text-amber-500 dark:text-amber-400 font-bold flex items-center text-[10px] leading-none shrink-0 ml-0.5">
              ★{{ stats.stars[m.id] || 1 }}
            </span>
            <span v-else class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0 ml-0.5"></span>
          </button>
        </nav>

        <!-- 右滾動按鈕 -->
        <button
          v-show="canScrollRight"
          @click="scrollNav('right')"
          type="button"
          class="shrink-0 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-slate-800 shadow-xs transition-all cursor-pointer"
          title="向右滾動關卡"
        >
          <ChevronRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- 行動裝置關卡選擇器 (< md) -->
      <div class="flex md:hidden items-center relative">
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          type="button"
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer shadow-xs"
        >
          <span>第 {{ currentMission?.number || 1 }} 關</span>
          <span v-if="(stats.scores[currentMission?.id] || 0) >= 70" class="text-amber-500 font-black text-[10px]">
            ★{{ stats.stars[currentMission?.id] || 1 }}
          </span>
          <ChevronDown class="w-3.5 h-3.5 text-slate-400 transition-transform" :class="{ 'rotate-180': isMobileMenuOpen }" />
        </button>

        <!-- 行動裝置關卡選擇彈窗 -->
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4"
          @click.self="isMobileMenuOpen = false"
        >
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 w-full max-w-xs shadow-2xl space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span class="text-xs font-black text-slate-800 dark:text-slate-200">選擇關卡 (共 10 關)</span>
              <button @click="isMobileMenuOpen = false" class="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                ✕
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
              <button
                v-for="(m, idx) in missions"
                :key="m.id"
                @click="emit('selectMission', idx); isMobileMenuOpen = false"
                class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer"
                :class="[
                  currentMissionIndex === idx
                    ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 text-purple-700 dark:text-purple-300 font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300'
                ]"
              >
                <span>第 {{ m.number }} 關</span>
                <span v-if="(stats.scores[m.id] || 0) >= 70" class="text-amber-500 font-black text-[10px]">
                  ★{{ stats.stars[m.id] || 1 }}
                </span>
                <span v-else class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側：美感榮譽、稱號、明暗開關 -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <!-- 稱號與經驗值膠囊 -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
          <Trophy class="w-4 h-4 text-amber-500 shrink-0" />
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
          class="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
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
          class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
          title="切換色彩模式"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-amber-400" />
          <Moon v-else class="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  </header>
</template>
