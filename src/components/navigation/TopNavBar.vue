<script setup>
import { computed } from 'vue'
import { Sparkles, Compass, CheckCircle2, Trophy, BookOpen, Bot, Code2, ExternalLink, Sun, Moon } from 'lucide-vue-next'

const props = defineProps({
  activeMode: { type: String, required: true }, // 'mission' | 'sandbox'
  activeMissionIndex: { type: Number, required: true },
  missions: { type: Array, required: true },
  completedMissions: { type: Array, required: true },
  currentTheme: { type: String, default: 'light' }
})

const emit = defineEmits([
  'update:activeMode',
  'selectMission',
  'openQuiz',
  'openShowcase',
  'openAiDrawer',
  'toggleTheme'
])

const completedCount = computed(() => props.completedMissions.length)
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 dark:border-slate-800/80 dark:bg-slate-950/85 backdrop-blur-xl transition-colors duration-200 shadow-xs dark:shadow-none">
    <div class="mx-auto flex h-16 max-w-[1760px] items-center justify-between px-4 sm:px-6 lg:px-8">
      
      <!-- Brand & Title -->
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-purple-600 via-indigo-600 to-pink-500 shadow-lg shadow-purple-500/25">
          <Sparkles class="h-5 w-5 text-white" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">CSS 視覺魔法實驗室</span>
            <span class="hidden rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-300 sm:inline-block">
              Tailwind 4 & AI 實戰
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">資訊科技課程・現代切版探索</p>
        </div>
      </div>

      <!-- Mode Switcher & Missions -->
      <div class="hidden md:flex items-center gap-2">
        <div class="flex rounded-xl bg-slate-100 dark:bg-slate-900/90 p-1 border border-slate-200 dark:border-slate-800">
          <button
            @click="emit('update:activeMode', 'mission')"
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
            :class="activeMode === 'mission' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <Trophy class="h-3.5 w-3.5" />
            實戰闖關 ({{ completedCount }}/{{ missions.length }})
          </button>
          <button
            @click="emit('update:activeMode', 'sandbox')"
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
            :class="activeMode === 'sandbox' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <Compass class="h-3.5 w-3.5" />
            自由沙盒
          </button>
        </div>

        <!-- Mission Pills (Visible in mission mode) -->
        <div v-if="activeMode === 'mission'" class="flex items-center gap-1.5 ml-2">
          <button
            v-for="(m, idx) in missions"
            :key="m.id"
            @click="emit('selectMission', idx)"
            class="group relative flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all border"
            :class="[
              activeMissionIndex === idx
                ? 'border-purple-500 bg-purple-500/20 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/40'
                : completedMissions.includes(m.id)
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
            ]"
            :title="m.title"
          >
            <CheckCircle2 v-if="completedMissions.includes(m.id)" class="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            <span v-else>{{ idx + 1 }}</span>
          </button>
        </div>
      </div>

      <!-- Right Action Tools -->
      <div class="flex items-center gap-2">
        <!-- 色系切換按鈕 -->
        <button
          @click="emit('toggleTheme')"
          class="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/90 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-white transition-all shadow-xs"
          :title="currentTheme === 'dark' ? '切換為亮色模式' : '切換為深色模式'"
          aria-label="切換外觀色系"
        >
          <Sun v-if="currentTheme === 'dark'" class="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
          <Moon v-else class="h-4 w-4 text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
          <span class="font-medium">{{ currentTheme === 'dark' ? '深色' : '亮色' }}</span>
        </button>

        <button
          @click="emit('openShowcase')"
          class="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/90 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white transition-colors shadow-xs"
          title="純 CSS 神級作品賞析"
        >
          <BookOpen class="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
          <span class="hidden sm:inline">神作賞析</span>
        </button>

        <button
          @click="emit('openQuiz')"
          class="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/90 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white transition-colors shadow-xs"
          title="課堂隨堂評量即測即評"
        >
          <CheckCircle2 class="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
          <span class="hidden sm:inline">隨堂測驗</span>
        </button>

        <button
          @click="emit('openAiDrawer')"
          class="flex items-center gap-1.5 rounded-lg border border-purple-300 bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100 dark:border-purple-500/40 dark:bg-linear-to-r dark:from-purple-900/30 dark:to-indigo-900/30 dark:text-purple-200 dark:hover:border-purple-400 transition-colors shadow-xs"
          title="Tailwind 4 & AI 提示詞詠唱庫"
        >
          <Bot class="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
          <span class="hidden sm:inline">Tailwind & AI</span>
        </button>
      </div>

    </div>

    <!-- Mobile Sub-bar for mission switching -->
    <div class="flex items-center justify-between border-t border-slate-200 bg-white/95 dark:border-slate-800/80 dark:bg-slate-950/95 px-4 py-2 md:hidden">
      <div class="flex items-center gap-1.5">
        <button
          @click="emit('update:activeMode', 'mission')"
          class="rounded-md px-2.5 py-1 text-xs font-medium"
          :class="activeMode === 'mission' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'"
        >
          實戰闖關
        </button>
        <button
          @click="emit('update:activeMode', 'sandbox')"
          class="rounded-md px-2.5 py-1 text-xs font-medium"
          :class="activeMode === 'sandbox' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'"
        >
          自由沙盒
        </button>
      </div>
      <div v-if="activeMode === 'mission'" class="flex items-center gap-1">
        <button
          v-for="(m, idx) in missions"
          :key="m.id"
          @click="emit('selectMission', idx)"
          class="flex h-7 w-7 items-center justify-center rounded text-xs font-bold"
          :class="[
            activeMissionIndex === idx ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
          ]"
        >
          {{ idx + 1 }}
        </button>
      </div>
    </div>
  </header>
</template>
