<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import TopNavBar from './components/navigation/TopNavBar.vue'
import MissionBrief from './components/mission/MissionBrief.vue'
import VisualControls from './components/mission/VisualControls.vue'
import LiveCssEditor from './components/mission/LiveCssEditor.vue'
import PreviewCanvas from './components/mission/PreviewCanvas.vue'
import BoxModelVisualizer from './components/mission/BoxModelVisualizer.vue'
import SandboxMode from './components/tools/SandboxMode.vue'
import TailwindAiDrawer from './components/tools/TailwindAiDrawer.vue'
import QuizModal from './components/tools/QuizModal.vue'
import ShowcaseModal from './components/tools/ShowcaseModal.vue'
import { MISSIONS } from './data/missions.js'

// 主題切換狀態（預設亮色系）
const currentTheme = ref('light')

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('css_magic_theme', currentTheme.value)
  applyTheme(currentTheme.value)
}

// 狀態管理
const activeMode = ref('mission') // 'mission' | 'sandbox'
const activeMissionIndex = ref(0)
const completedMissions = ref([])

// 彈窗與抽屜開關
const isQuizOpen = ref(false)
const isShowcaseOpen = ref(false)
const isAiDrawerOpen = ref(false)

// 當前任務
const currentMission = computed(() => MISSIONS[activeMissionIndex.value])

// 各任務動態狀態字典
const missionStates = reactive(
  Object.fromEntries(MISSIONS.map(m => [m.id, { ...m.initialState }]))
)

const currentState = computed({
  get: () => missionStates[currentMission.value.id],
  set: (val) => {
    missionStates[currentMission.value.id] = val
  }
})

// 檢核狀態計算
const currentChecklistStatus = computed(() => {
  const m = currentMission.value
  const state = missionStates[m.id]
  return m.checklist.map(item => ({
    id: item.id,
    label: item.label,
    passed: item.check(state)
  }))
})

const isCurrentMissionCompleted = computed(() => {
  return currentChecklistStatus.value.every(i => i.passed)
})

// 監聽任務達成並發射慶祝彩帶
watch(isCurrentMissionCompleted, (newVal) => {
  if (newVal && !completedMissions.value.includes(currentMission.value.id)) {
    completedMissions.value.push(currentMission.value.id)
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    })
    saveProgress()
  }
})

function handleResetState() {
  const m = currentMission.value
  missionStates[m.id] = { ...m.initialState }
}

function saveProgress() {
  localStorage.setItem('css_magic_completed', JSON.stringify(completedMissions.value))
}

onMounted(() => {
  // 初始化色系（優先讀取本地儲存，預設為亮色系）
  const savedTheme = localStorage.getItem('css_magic_theme')
  currentTheme.value = savedTheme || 'light'
  applyTheme(currentTheme.value)

  const saved = localStorage.getItem('css_magic_completed')
  if (saved) {
    try {
      completedMissions.value = JSON.parse(saved)
    } catch (e) {}
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white transition-colors duration-200">
    
    <!-- Top Navigation -->
    <TopNavBar
      :activeMode="activeMode"
      :activeMissionIndex="activeMissionIndex"
      :missions="MISSIONS"
      :completedMissions="completedMissions"
      :currentTheme="currentTheme"
      @update:activeMode="activeMode = $event"
      @selectMission="activeMissionIndex = $event"
      @openQuiz="isQuizOpen = true"
      @openShowcase="isShowcaseOpen = true"
      @openAiDrawer="isAiDrawerOpen = true"
      @toggleTheme="toggleTheme"
    />

    <!-- Main Content Body -->
    <main class="flex-1 mx-auto max-w-[1760px] w-full p-4 sm:p-6 lg:p-8">
      
      <!-- MISSION MODE -->
      <div v-if="activeMode === 'mission'" class="space-y-6">
        
        <!-- Mission Brief Section -->
        <MissionBrief
          :mission="currentMission"
          :checklistStatus="currentChecklistStatus"
          :isCompleted="isCurrentMissionCompleted"
        />

        <!-- Three-Column Workbench: 控制器在左、CSS在中、畫布在右 並列在一排 -->
        <div class="grid gap-6 grid-cols-1 xl:grid-cols-12 items-start">
          
          <!-- 1. 左側：視覺控制器 (Visual Controls & Onion Box Model) -->
          <div class="space-y-5 xl:col-span-4">
            <VisualControls
              :missionId="currentMission.id"
              :state="currentState"
              @update:state="currentState = $event"
              @resetState="handleResetState"
            />

            <!-- Onion Box Model Visualizer for Mission 1 -->
            <BoxModelVisualizer
              v-if="currentMission.id === 'mission-1'"
              :boxSizing="currentState.boxSizing"
              :padding="currentState.padding"
              :borderWidth="currentState.borderWidth"
              :margin="currentState.margin"
              :contentWidth="currentState.contentWidth"
            />
          </div>

          <!-- 2. 中間：實時 CSS 代碼 (Live CSS & Tailwind Code) -->
          <div class="space-y-5 xl:col-span-4 xl:sticky xl:top-20">
            <LiveCssEditor
              :missionId="currentMission.id"
              :state="currentState"
            />
          </div>

          <!-- 3. 右側：即時渲染畫布 (Live Preview Canvas) -->
          <div class="xl:col-span-4 xl:sticky xl:top-20">
            <PreviewCanvas
              :missionId="currentMission.id"
              :state="currentState"
            />
          </div>

        </div>

      </div>

      <!-- SANDBOX MODE -->
      <div v-else-if="activeMode === 'sandbox'">
        <SandboxMode />
      </div>

    </main>

    <!-- Modals & Drawers -->
    <QuizModal :isOpen="isQuizOpen" @close="isQuizOpen = false" />
    <ShowcaseModal :isOpen="isShowcaseOpen" @close="isShowcaseOpen = false" />
    <TailwindAiDrawer :isOpen="isAiDrawerOpen" @close="isAiDrawerOpen = false" />

    <!-- Footer -->
    <footer class="border-t border-slate-200 bg-white/80 dark:border-slate-900 dark:bg-slate-950/90 py-6 text-center text-xs text-slate-500 dark:text-slate-500 transition-colors duration-200">
      <p>資訊科技課程教材・CSS 現代視覺魔法與響應式切版實戰平台</p>
      <p class="mt-1">Powered by Vue 3 + Tailwind CSS 4 + Vite</p>
    </footer>

  </div>
</template>
