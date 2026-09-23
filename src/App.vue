<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { MISSIONS } from './data/missions.js'
import { BADGES } from './data/badges.js'
import { generateMissionCss } from './data/cssGenerators.js'
import { evaluateMission } from './data/aiService.js'

import AppHeader from './components/layout/AppHeader.vue'
import MissionStoryBanner from './components/layout/MissionStoryBanner.vue'
import TripleWorkbench from './components/mission/TripleWorkbench.vue'
import InteractiveToolbox from './components/mission/InteractiveToolbox.vue'
import StickyWorkbenchBar from './components/mission/StickyWorkbenchBar.vue'
import MissionControlBar from './components/mission/MissionControlBar.vue'

import ScoreModal from './components/modal/ScoreModal.vue'
import TargetCompareModal from './components/modal/TargetCompareModal.vue'
import BadgeModal from './components/modal/BadgeModal.vue'

// 關卡索引
const currentMissionIndex = ref(0)
const currentMission = computed(() => MISSIONS[currentMissionIndex.value])

// 每關十項工具的開關與數值狀態字典
const missionToolStates = reactive({})

// 初始化各關的 10 項工具狀態
MISSIONS.forEach(m => {
  missionToolStates[m.id] = {}
  m.tools.forEach(tool => {
    missionToolStates[m.id][tool.id] = {
      enabled: false,
      value: tool.defaultValue
    }
  })
})

// 根據當前關卡的工具開關狀態，轉換為 CSS 產生器所需的資料模型
const activeComputedState = computed(() => {
  const mid = currentMission.value.id
  const states = missionToolStates[mid] || {}

  if (mid === 'mission-1') {
    return {
      borderRadius: states.borderRadius?.enabled ? states.borderRadius.value : 0,
      paddingY: states.paddingY?.enabled ? states.paddingY.value : 4,
      paddingX: states.paddingX?.enabled ? states.paddingX.value : 10,
      bgColor: states.bgColor?.enabled ? states.bgColor.value : '#cbd5e1',
      bgType: states.gradientToggle?.enabled ? 'gradient' : 'solid',
      gradientTo: states.gradientColor?.enabled ? states.gradientColor.value : '#a855f7',
      gradientAngle: 135,
      textColor: states.textColor?.enabled ? states.textColor.value : '#0f172a',
      shadowBlur: states.shadowBlur?.enabled ? states.shadowBlur.value : 0,
      shadowY: states.shadowBlur?.enabled ? 10 : 0,
      shadowColor: states.bgColor?.value || '#6366f1',
      fontWeight: states.fontWeight?.enabled ? states.fontWeight.value : 400,
      hoverY: states.hoverY?.enabled ? states.hoverY.value : 0,
      // 5 項干擾/陷阱項
      borderHeavy: states.borderHeavy?.enabled ? states.borderHeavy.value : 0,
      textShadowTrap: states.textShadowTrap?.enabled,
      letterSpacingTrap: states.letterSpacingTrap?.enabled ? states.letterSpacingTrap.value : 0,
      btnRotateTrap: states.btnRotateTrap?.enabled ? states.btnRotateTrap.value : 0,
      grayscaleTrap: states.grayscaleTrap?.enabled
    }
  }

  if (mid === 'mission-2') {
    return {
      cardPadding: states.cardPadding?.enabled ? states.cardPadding.value : 4,
      cardRadius: states.cardRadius?.enabled ? states.cardRadius.value : 0,
      cardBg: states.cardBg?.enabled ? states.cardBg.value : '#ffffff',
      backdropBlur: states.backdropBlur?.enabled ? states.backdropBlur.value : 0,
      avatarRadius: states.avatarRadius?.enabled ? states.avatarRadius.value : 0,
      avatarRingColor: states.avatarRingColor?.enabled ? states.avatarRingColor.value : '#000000',
      userNameSize: states.userNameSize?.enabled ? states.userNameSize.value : 14,
      userNameWeight: states.userNameWeight?.enabled ? states.userNameWeight.value : 400,
      userRoleColor: states.userRoleColor?.enabled ? states.userRoleColor.value : '#000000',
      cardShadowBlur: states.cardShadow?.enabled ? states.cardShadow.value : 0,
      // 5 項干擾/陷阱項
      cardBorderHeavy: states.cardBorderHeavy?.enabled ? states.cardBorderHeavy.value : 0,
      cardSkewTrap: states.cardSkewTrap?.enabled ? states.cardSkewTrap.value : 0,
      userNameItalicTrap: states.userNameItalicTrap?.enabled,
      avatarSquareTrap: states.avatarSquareTrap?.enabled,
      cardDashedTrap: states.cardDashedTrap?.enabled
    }
  }

  if (mid === 'mission-3') {
    return {
      overflow: states.overflowToggle?.enabled ? 'hidden' : 'visible',
      cardRadius: states.cardRadius?.enabled ? states.cardRadius.value : 0,
      cardBg: states.cardBg?.enabled ? states.cardBg.value : '#ffffff',
      foodImgFit: states.foodImgFit?.enabled ? states.foodImgFit.value : 'fill',
      badgePosition: states.badgePosition?.enabled ? 'absolute' : 'static',
      badgeTop: states.badgeTop?.enabled ? states.badgeTop.value : 0,
      badgeBg: states.badgeBg?.enabled ? states.badgeBg.value : '#ff0000',
      priceColor: states.priceColor?.enabled ? states.priceColor.value : '#000000',
      priceSize: states.priceSize?.enabled ? states.priceSize.value : 14,
      cardShadowBlur: states.cardShadow?.enabled ? states.cardShadow.value : 0,
      // 5 項干擾/陷阱項
      imgRotateTrap: states.imgRotateTrap?.enabled ? states.imgRotateTrap.value : 0,
      imgSepiaTrap: states.imgSepiaTrap?.enabled,
      cardBorderDoubleTrap: states.cardBorderDoubleTrap?.enabled,
      priceUnderlineTrap: states.priceUnderlineTrap?.enabled,
      badgeInvertTrap: states.badgeInvertTrap?.enabled
    }
  }

  if (mid === 'mission-4') {
    return {
      formGap: states.formGap?.enabled ? states.formGap.value : 0,
      formPadding: states.formPadding?.enabled ? states.formPadding.value : 6,
      formRadius: states.formRadius?.enabled ? states.formRadius.value : 0,
      formBg: states.formPadding?.enabled ? '#0f172a' : '#ffffff',
      inputPadding: states.inputPadding?.enabled ? states.inputPadding.value : 2,
      inputRadius: states.inputRadius?.enabled ? states.inputRadius.value : 0,
      focusGlow: states.focusGlowToggle?.enabled,
      focusColor: states.focusColor?.enabled ? states.focusColor.value : '#000000',
      submitBtnBg: states.submitBtnBg?.enabled ? states.submitBtnBg.value : '#000000',
      submitRadius: states.submitRadius?.enabled ? states.submitRadius.value : 0,
      formShadow: states.formShadow?.enabled ? states.formShadow.value : 0,
      // 5 項干擾/陷阱項
      inputBorderHeavyTrap: states.inputBorderHeavyTrap?.enabled ? states.inputBorderHeavyTrap.value : 0,
      inputDottedTrap: states.inputDottedTrap?.enabled,
      labelBlurTrap: states.labelBlurTrap?.enabled ? states.labelBlurTrap.value : 0,
      submitInvertTrap: states.submitInvertTrap?.enabled,
      formSkewTrap: states.formSkewTrap?.enabled ? states.formSkewTrap.value : 0
    }
  }

  // mission-5
  return {
    heroPadding: states.heroPadding?.enabled ? states.heroPadding.value : 10,
    heroRadius: states.heroRadius?.enabled ? states.heroRadius.value : 0,
    ambientGlow: states.ambientGlowToggle?.enabled,
    titleGradient: states.titleGradientToggle?.enabled,
    titleSize: states.titleSize?.enabled ? states.titleSize.value : 20,
    titleWeight: states.titleWeight?.enabled ? states.titleWeight.value : 400,
    primaryBtnBg: states.primaryBtnBg?.enabled ? states.primaryBtnBg.value : '#000000',
    primaryBtnRadius: states.primaryBtnRadius?.enabled ? states.primaryBtnRadius.value : 0,
    secondaryGhost: states.secondaryGhostToggle?.enabled,
    heroShadow: states.heroShadow?.enabled ? states.heroShadow.value : 0,
    // 5 項干擾/陷阱項
    titleSkewTrap: states.titleSkewTrap?.enabled ? states.titleSkewTrap.value : 0,
    rainbowBorderTrap: states.rainbowBorderTrap?.enabled,
    descTinyTrap: states.descTinyTrap?.enabled,
    ghostDashedTrap: states.ghostDashedTrap?.enabled,
    heroBorderHeavyTrap: states.heroBorderHeavyTrap?.enabled ? states.heroBorderHeavyTrap.value : 0
  }
})

// 當前產生的 CSS
const currentCss = computed(() => {
  return generateMissionCss(currentMission.value.id, activeComputedState.value)
})

// 動態焦點與微光提示
const hasRecentChange = ref(false)
const lastFeedback = ref('')

// 遊戲化統計數據
const stats = reactive({
  scores: {},
  stars: {},
  totalExp: 0,
  totalActions: 0,
  promptUsageCount: 0,
  unlockedBadges: []
})

// 彈窗狀態
const isScoreModalOpen = ref(false)
const isTargetModalOpen = ref(false)
const isBadgeModalOpen = ref(false)
const currentEvalResult = ref(null)

// 深淺色模式
const isDark = ref(true)

onMounted(() => {
  const savedDark = localStorage.getItem('css_lab_theme')
  if (savedDark !== null) {
    isDark.value = savedDark === 'dark'
  }
  updateThemeClass()

  const savedStats = localStorage.getItem('css_lab_stats_v2')
  if (savedStats) {
    try {
      const parsed = JSON.parse(savedStats)
      Object.assign(stats, parsed)
    } catch {
      // 略過
    }
  }
  checkAndUnlockBadges()
})

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('css_lab_theme', isDark.value ? 'dark' : 'light')
  updateThemeClass()
}

function updateThemeClass() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function saveStats() {
  localStorage.setItem('css_lab_stats_v2', JSON.stringify(stats))
  checkAndUnlockBadges()
}

function checkAndUnlockBadges() {
  BADGES.forEach(b => {
    if (!stats.unlockedBadges.includes(b.id) && b.isUnlocked(stats)) {
      stats.unlockedBadges.push(b.id)
    }
  })
}

function triggerChangePulse(msg) {
  hasRecentChange.value = true
  lastFeedback.value = msg || ''
  stats.totalActions++
  setTimeout(() => {
    hasRecentChange.value = false
  }, 120)
}

// 點擊工具按鈕：點一下加上 CSS，再點一下還原
function handleToggleTool({ toolId, enabled, value }) {
  const mid = currentMission.value.id
  if (!missionToolStates[mid]) missionToolStates[mid] = {}
  
  missionToolStates[mid][toolId] = {
    enabled,
    value
  }

  const toolDef = currentMission.value.tools.find(t => t.id === toolId)
  const actionText = enabled ? `啟用屬性：${toolDef?.name || toolId}` : `還原屬性：${toolDef?.name || toolId}`
  triggerChangePulse(actionText)
  saveStats()
}

// 拖拉滑桿或選取顏色更新數值
function handleUpdateToolValue({ toolId, value }) {
  const mid = currentMission.value.id
  if (!missionToolStates[mid]) missionToolStates[mid] = {}

  missionToolStates[mid][toolId] = {
    enabled: true, // 調整數值自動保持啟用
    value
  }

  triggerChangePulse(`微調數值：${value}`)
  saveStats()
}

// 吸取目標顏色
function handlePickColor(hex) {
  triggerChangePulse(`吸取目標色碼 ${hex}`)
}


// 重置任務為陽春版
function handleResetMission() {
  const mid = currentMission.value.id
  currentMission.value.tools.forEach(tool => {
    missionToolStates[mid][tool.id] = {
      enabled: false,
      value: tool.defaultValue
    }
  })
  triggerChangePulse('已將所有工具重置為初始陽春狀態')
  saveStats()
}

// 送交 AI 綜合評分
function handleSubmitEvaluation() {
  const mid = currentMission.value.id
  const evalRes = evaluateMission(currentMission.value, currentCss.value)
  currentEvalResult.value = evalRes

  const prevScore = stats.scores[mid] || 0
  if (evalRes.score > prevScore) {
    stats.scores[mid] = evalRes.score
    stats.stars[mid] = evalRes.stars

    const expGained = evalRes.score >= 90 ? 100 : evalRes.score >= 80 ? 60 : 40
    stats.totalExp += expGained
  }

  saveStats()
  isScoreModalOpen.value = true
}

// 切換關卡
function handleSelectMission(index) {
  currentMissionIndex.value = index
  lastFeedback.value = ''
}

// 平滑滾動回主畫布
function handleScrollToWorkbench() {
  window.scrollTo({ top: 120, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors selection:bg-purple-500 selection:text-white font-sans">
    <!-- 頂部導航 -->
    <AppHeader
      :missions="MISSIONS"
      :currentMissionIndex="currentMissionIndex"
      :stats="stats"
      :isDark="isDark"
      @selectMission="handleSelectMission"
      @toggleDark="toggleDark"
      @openBadges="isBadgeModalOpen = true"
    />

    <!-- 頂部全寬吸附式對比列 (向下滾動時自動吸附，與版面同寬，零跑版) -->
    <StickyWorkbenchBar
      :mission="currentMission"
      :currentCss="currentCss"
      :score="stats.scores[currentMission.id] || 0"
      :stars="stats.stars[currentMission.id] || 0"
      @scrollToWorkbench="handleScrollToWorkbench"
      @pickColor="handlePickColor"
    />

    <!-- 主工作區 -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      <!-- 關卡情境委託劇本卡 -->
      <MissionStoryBanner
        :mission="currentMission"
        :score="stats.scores[currentMission.id] || 0"
        :stars="stats.stars[currentMission.id] || 0"
      />

      <!-- 核心三欄對比工作台：左側當前樣式、中間 CSS 即時檢閱、右側目標樣式與滴管情報 -->
      <TripleWorkbench
        :mission="currentMission"
        :currentCss="currentCss"
        :hasRecentChange="hasRecentChange"
        @copyColor="handlePickColor"
      />

      <!-- 十項視覺調校工具箱（點一下加上 CSS，再點一下還原，支援拖拉滑桿與 Color Picker） -->
      <InteractiveToolbox
        :tools="currentMission.tools"
        :toolStates="missionToolStates[currentMission.id] || {}"
        :targetColors="currentMission.targetInspector?.colors || []"
        @toggleTool="handleToggleTool"
        @updateValue="handleUpdateToolValue"
        @pickColor="handlePickColor"
      />


      <!-- 底部操作控制列 (重置、Target 祕笈、交由 AI 評分) -->
      <MissionControlBar
        :isEvaluating="false"
        :currentScore="stats.scores[currentMission.id] || 0"
        @resetMission="handleResetMission"
        @openTargetModal="isTargetModalOpen = true"
        @submitEvaluation="handleSubmitEvaluation"
      />
    </main>

    <!-- 頁尾 -->
    <footer class="mt-auto py-6 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
      <p>CSS 魔法實驗室 • 三欄即時對照 • 零經驗新手美感沙盒</p>
    </footer>

    <!-- 彈窗群組 -->
    <ScoreModal
      :isOpen="isScoreModalOpen"
      :evalResult="currentEvalResult"
      :hasNextMission="currentMissionIndex < MISSIONS.length - 1"
      @close="isScoreModalOpen = false"
      @nextMission="handleNextMission"
    />

    <TargetCompareModal
      :isOpen="isTargetModalOpen"
      :mission="currentMission"
      @close="isTargetModalOpen = false"
    />

    <BadgeModal
      :isOpen="isBadgeModalOpen"
      :stats="stats"
      @close="isBadgeModalOpen = false"
    />
  </div>
</template>
