<script setup>
import { ref, computed } from 'vue'
import { Layers, LayoutGrid, Sparkles, Plus, Trash2, RotateCcw, SlidersHorizontal, Copy, Check } from 'lucide-vue-next'
import BoxModelVisualizer from '../mission/BoxModelVisualizer.vue'

const activeTab = ref('box') // 'box' | 'basic' | 'flex' | 'animation'

// 盒模型沙盒狀態
const boxState = ref({
  boxSizing: 'border-box',
  width: 320,
  padding: 24,
  borderWidth: 4,
  margin: 20
})

// 基礎屬性沙盒狀態
const basicState = ref({
  display: 'inline-block', // block | inline | inline-block | none
  width: 200,
  height: 90,
  borderRadius: 16,
  isCapsule: false,
  backgroundType: 'gradient', // solid | gradient
  solidColor: '#1e293b',
  gradientPreset: 'indigo-pink', // indigo-pink | emerald-teal | amber-rose | cyber-dark
  overflow: 'hidden', // visible | hidden | scroll | auto
  cursor: 'pointer', // pointer | default | grab | not-allowed | text
  sampleText: '探索 CSS 基礎視覺魔法！長文本將在容器內演示 overflow 裁切與滾動效果。'
})

const isBasicCopied = ref(false)

const basicPresets = [
  {
    name: '膠囊按鈕',
    state: { display: 'inline-block', width: 140, height: 44, borderRadius: 22, isCapsule: true, backgroundType: 'gradient', gradientPreset: 'indigo-pink', overflow: 'hidden', cursor: 'pointer' }
  },
  {
    name: '資訊卡片 (Block)',
    state: { display: 'block', width: 280, height: 120, borderRadius: 16, isCapsule: false, backgroundType: 'gradient', gradientPreset: 'cyber-dark', overflow: 'hidden', cursor: 'default' }
  },
  {
    name: '滾動文字框',
    state: { display: 'block', width: 220, height: 80, borderRadius: 12, isCapsule: false, backgroundType: 'solid', solidColor: '#1e293b', overflow: 'scroll', cursor: 'text' }
  },
  {
    name: '行內標籤 (Inline)',
    state: { display: 'inline', width: 100, height: 40, borderRadius: 6, isCapsule: false, backgroundType: 'gradient', gradientPreset: 'emerald-teal', overflow: 'visible', cursor: 'pointer' }
  }
]

function applyBasicPreset(preset) {
  Object.assign(basicState.value, preset.state)
}

function resetBasic() {
  basicState.value = {
    display: 'inline-block',
    width: 200,
    height: 90,
    borderRadius: 16,
    isCapsule: false,
    backgroundType: 'gradient',
    solidColor: '#1e293b',
    gradientPreset: 'indigo-pink',
    overflow: 'hidden',
    cursor: 'pointer',
    sampleText: '探索 CSS 基礎視覺魔法！長文本將在容器內演示 overflow 裁切與滾動效果。'
  }
}

const basicBgStyle = computed(() => {
  if (basicState.value.backgroundType === 'solid') {
    return { backgroundColor: basicState.value.solidColor }
  }
  switch (basicState.value.gradientPreset) {
    case 'indigo-pink':
      return { background: 'linear-gradient(135deg, #6366f1, #ec4899)' }
    case 'emerald-teal':
      return { background: 'linear-gradient(135deg, #10b981, #06b6d4)' }
    case 'amber-rose':
      return { background: 'linear-gradient(135deg, #f59e0b, #f43f5e)' }
    case 'cyber-dark':
      return { background: 'linear-gradient(135deg, #1e293b, #0f172a)' }
    default:
      return { background: 'linear-gradient(135deg, #6366f1, #ec4899)' }
  }
})

const generatedBasicCss = computed(() => {
  const bg = basicState.value.backgroundType === 'solid'
    ? `background-color: ${basicState.value.solidColor};`
    : `background: ${basicBgStyle.value.background};`
  const radius = basicState.value.isCapsule ? '9999px' : `${basicState.value.borderRadius}px`
  const w = basicState.value.display === 'inline' ? '/* width 在 inline 下不生效 */' : `width: ${basicState.value.width}px;`
  const h = basicState.value.display === 'inline' ? '/* height 在 inline 下不生效 */' : `height: ${basicState.value.height}px;`

  return `.magic-box {
  display: ${basicState.value.display};
  ${w}
  ${h}
  border-radius: ${radius};
  ${bg}
  overflow: ${basicState.value.overflow};
  cursor: ${basicState.value.cursor};
}`
})

function copyBasicCss() {
  navigator.clipboard.writeText(generatedBasicCss.value)
  isBasicCopied.value = true
  setTimeout(() => { isBasicCopied.value = false }, 2000)
}

// Flexbox 沙盒狀態
const flexState = ref({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 16,
  itemCount: 4
})

// 動畫沙盒狀態
const animState = ref({
  type: 'spin', // 'spin' | 'pulse' | 'bounce'
  duration: 1.5,
  timing: 'ease-in-out',
  iteration: 'infinite'
})

function resetBox() {
  boxState.value = { boxSizing: 'border-box', width: 320, padding: 24, borderWidth: 4, margin: 20 }
}
function resetFlex() {
  flexState.value = { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 16, itemCount: 4 }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Sandbox Header & Tabs -->
    <div class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-4 backdrop-blur-md shadow-xs dark:shadow-none transition-colors duration-200">
      <div>
        <h2 class="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl flex items-center gap-2">
          <Sparkles class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          自由視覺沙盒 (Visual Sandbox)
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">免解任務限制，無拘無束隨心所欲調校 CSS 空間與動態！</p>
      </div>

      <div class="flex rounded-xl bg-slate-100 dark:bg-slate-950/80 p-1 border border-slate-200 dark:border-slate-800">
        <button
          @click="activeTab = 'box'"
          class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
          :class="activeTab === 'box' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
        >
          <Layers class="h-3.5 w-3.5" />
          盒模型剖析室
        </button>
        <button
          @click="activeTab = 'basic'"
          class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
          :class="activeTab === 'basic' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
        >
          <SlidersHorizontal class="h-3.5 w-3.5" />
          基礎屬性實作室
        </button>
        <button
          @click="activeTab = 'flex'"
          class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
          :class="activeTab === 'flex' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
        >
          <LayoutGrid class="h-3.5 w-3.5" />
          Flexbox 遊樂場
        </button>
        <button
          @click="activeTab = 'animation'"
          class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
          :class="activeTab === 'animation' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
        >
          <Sparkles class="h-3.5 w-3.5" />
          動畫動態室
        </button>
      </div>
    </div>

    <!-- TAB 1: BOX MODEL LAB -->
    <div v-if="activeTab === 'box'" class="grid gap-6 lg:grid-cols-2">
      <!-- Controls -->
      <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-5 backdrop-blur-md space-y-4 text-xs shadow-xs dark:shadow-none transition-colors">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <span class="font-bold text-slate-800 dark:text-slate-200">盒模型參數調整</span>
          <button @click="resetBox" class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors">
            <RotateCcw class="h-3 w-3" /> 重設
          </button>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">box-sizing 計算法則：</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="boxState.boxSizing = 'content-box'"
              class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
              :class="boxState.boxSizing === 'content-box' ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              content-box (外加撐爆)
            </button>
            <button
              @click="boxState.boxSizing = 'border-box'"
              class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
              :class="boxState.boxSizing === 'border-box' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              border-box (標準鎖死)
            </button>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>寬度 (width):</span>
            <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ boxState.width }}px</span>
          </div>
          <input type="range" min="150" max="400" step="10" v-model.number="boxState.width" class="w-full accent-purple-600" />
        </div>

        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>內留白 (padding):</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ boxState.padding }}px</span>
          </div>
          <input type="range" min="0" max="60" step="2" v-model.number="boxState.padding" class="w-full accent-emerald-600" />
        </div>

        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>邊框 (border-width):</span>
            <span class="font-mono text-amber-600 dark:text-yellow-400 font-bold">{{ boxState.borderWidth }}px</span>
          </div>
          <input type="range" min="0" max="16" step="1" v-model.number="boxState.borderWidth" class="w-full accent-amber-500" />
        </div>

        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>外邊距 (margin):</span>
            <span class="font-mono text-amber-600 dark:text-amber-400 font-bold">{{ boxState.margin }}px</span>
          </div>
          <input type="range" min="0" max="40" step="2" v-model.number="boxState.margin" class="w-full accent-amber-500" />
        </div>
      </div>

      <!-- Onion Diagram & Live Card -->
      <div class="space-y-4">
        <BoxModelVisualizer
          :boxSizing="boxState.boxSizing"
          :padding="boxState.padding"
          :borderWidth="boxState.borderWidth"
          :margin="boxState.margin"
          :contentWidth="boxState.width"
        />
      </div>
    </div>

    <!-- TAB: BASIC CSS WORKSHOP (NEW) -->
    <div v-else-if="activeTab === 'basic'" class="grid gap-6 lg:grid-cols-2">
      <!-- Controls Column (Left) -->
      <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-5 backdrop-blur-md space-y-4 text-xs shadow-xs dark:shadow-none transition-colors">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-slate-800 dark:text-slate-200">新手必學基礎屬性調整</span>
            <span class="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">核心基礎</span>
          </div>
          <button @click="resetBasic" class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors">
            <RotateCcw class="h-3 w-3" /> 重設
          </button>
        </div>

        <!-- 快速預設情境 -->
        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">快速預設範本 (Presets)：</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              v-for="p in basicPresets"
              :key="p.name"
              @click="applyBasicPreset(p)"
              class="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-1.5 text-center text-[11px] text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium"
            >
              {{ p.name }}
            </button>
          </div>
        </div>

        <!-- 1. display 屬性 -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="font-semibold text-slate-700 dark:text-slate-300">1. 排版顯示行為 (display)：</label>
            <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ basicState.display }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="d in [
                { key: 'block', name: 'block', desc: '獨占一行，自訂寬高' },
                { key: 'inline', name: 'inline', desc: '並排文字流，寬高失效' },
                { key: 'inline-block', name: 'inline-block', desc: '並排且支援自訂寬高' },
                { key: 'none', name: 'none', desc: '完全隱藏不佔空間' }
              ]"
              :key="d.key"
              @click="basicState.display = d.key"
              class="rounded-xl border p-2 text-left font-mono transition-all"
              :class="basicState.display === d.key ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              <div class="font-bold text-xs">{{ d.name }}</div>
              <div class="text-[10px] font-sans font-normal opacity-80 mt-0.5">{{ d.desc }}</div>
            </button>
          </div>
          <div v-if="basicState.display === 'inline'" class="mt-2 rounded-lg bg-amber-500/15 border border-amber-500/30 p-2 text-[10px] text-amber-700 dark:text-amber-300">
            💡 新手避坑提示：當設為 <code>display: inline</code> 時，瀏覽器會直接忽略 <code>width</code> 與 <code>height</code>，尺寸由內部文字字元撐開！
          </div>
        </div>

        <!-- 2. width & height 尺寸滑桿 -->
        <div class="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800" :class="{ 'opacity-50': basicState.display === 'inline' }">
          <div>
            <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
              <span>寬度 (width):</span>
              <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ basicState.width }}px</span>
            </div>
            <input
              type="range"
              min="80"
              max="340"
              step="10"
              v-model.number="basicState.width"
              :disabled="basicState.display === 'inline'"
              class="w-full accent-emerald-600"
            />
          </div>
          <div>
            <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
              <span>高度 (height):</span>
              <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ basicState.height }}px</span>
            </div>
            <input
              type="range"
              min="40"
              max="200"
              step="5"
              v-model.number="basicState.height"
              :disabled="basicState.display === 'inline'"
              class="w-full accent-emerald-600"
            />
          </div>
        </div>

        <!-- 3. border-radius 圓角 -->
        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>3. 圓角半徑 (border-radius):</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{{ basicState.isCapsule ? '9999px (膠囊/圓形)' : `${basicState.borderRadius}px` }}</span>
          </div>
          <div class="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="50"
              step="2"
              v-model.number="basicState.borderRadius"
              :disabled="basicState.isCapsule"
              class="w-full accent-emerald-600"
            />
            <button
              @click="basicState.isCapsule = !basicState.isCapsule"
              class="shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold border transition-all"
              :class="basicState.isCapsule ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'"
            >
              膠囊 9999px
            </button>
          </div>
        </div>

        <!-- 4. background 背景色彩與漸層 -->
        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">4. 背景渲染 (background)：</label>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <button
              @click="basicState.backgroundType = 'gradient'"
              class="rounded-lg border p-1.5 text-center text-xs font-semibold transition-all"
              :class="basicState.backgroundType === 'gradient' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              炫彩漸層 (linear-gradient)
            </button>
            <button
              @click="basicState.backgroundType = 'solid'"
              class="rounded-lg border p-1.5 text-center text-xs font-semibold transition-all"
              :class="basicState.backgroundType === 'solid' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              純色填滿 (solid color)
            </button>
          </div>

          <!-- 漸層選單 -->
          <div v-if="basicState.backgroundType === 'gradient'" class="grid grid-cols-4 gap-1.5">
            <button
              v-for="g in [
                { key: 'indigo-pink', name: '紫粉極光', style: 'background: linear-gradient(135deg, #6366f1, #ec4899);' },
                { key: 'emerald-teal', name: '翠綠流光', style: 'background: linear-gradient(135deg, #10b981, #06b6d4);' },
                { key: 'amber-rose', name: '晨曦暖陽', style: 'background: linear-gradient(135deg, #f59e0b, #f43f5e);' },
                { key: 'cyber-dark', name: '深邃夜空', style: 'background: linear-gradient(135deg, #1e293b, #0f172a);' }
              ]"
              :key="g.key"
              @click="basicState.gradientPreset = g.key"
              class="h-8 rounded-lg border flex items-center justify-center text-[10px] font-bold text-white shadow-xs transition-transform hover:scale-105"
              :class="basicState.gradientPreset === g.key ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 border-white' : 'border-transparent'"
              :style="g.style"
            >
              {{ g.name }}
            </button>
          </div>

          <!-- 純色選單 -->
          <div v-else class="flex items-center gap-2">
            <input type="color" v-model="basicState.solidColor" class="h-8 w-12 cursor-pointer rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent p-0.5" />
            <span class="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">{{ basicState.solidColor }}</span>
          </div>
        </div>

        <!-- 5. overflow 溢位控制 -->
        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">5. 內容超出處理 (overflow)：</label>
          <div class="grid grid-cols-4 gap-1.5 font-mono text-[11px]">
            <button
              v-for="o in ['visible', 'hidden', 'scroll', 'auto']"
              :key="o"
              @click="basicState.overflow = o"
              class="rounded-lg border p-1.5 text-center transition-all"
              :class="basicState.overflow === o ? 'border-emerald-500 bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              {{ o }}
            </button>
          </div>
        </div>

        <!-- 6. cursor 游標樣式 -->
        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">6. 滑鼠懸停游標 (cursor)：</label>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-1.5 font-mono text-[11px]">
            <button
              v-for="c in ['pointer', 'default', 'grab', 'not-allowed', 'text']"
              :key="c"
              @click="basicState.cursor = c"
              class="rounded-lg border p-1.5 text-center transition-all truncate"
              :style="{ cursor: c }"
              :class="basicState.cursor === c ? 'border-emerald-500 bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              {{ c }}
            </button>
          </div>
        </div>
      </div>

      <!-- Preview Column (Right) -->
      <div class="space-y-4">
        <!-- Live Visual Canvas -->
        <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-xs dark:shadow-none transition-colors">
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">
            <span class="font-bold text-slate-800 dark:text-slate-200 text-xs">即時視覺成果預覽</span>
            <span class="text-[10px] text-slate-400">滑鼠移至元件上體驗 cursor 游標</span>
          </div>

          <!-- Context Stage: Demonstrating inline vs block behavior with surrounding text -->
          <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 p-5 min-h-55 flex flex-col justify-center leading-relaxed text-sm text-slate-600 dark:text-slate-300">
            <div>
              <span class="text-xs text-slate-400 select-none mr-2 font-mono">文檔前綴文字...</span>
              
              <!-- The Target Dynamic Element -->
              <div
                v-if="basicState.display !== 'none'"
                class="magic-box-element text-white p-3 shadow-lg select-none transition-all border border-white/20"
                :style="{
                  display: basicState.display,
                  width: basicState.display !== 'inline' ? `${basicState.width}px` : undefined,
                  height: basicState.display !== 'inline' ? `${basicState.height}px` : undefined,
                  borderRadius: basicState.isCapsule ? '9999px' : `${basicState.borderRadius}px`,
                  overflow: basicState.overflow,
                  cursor: basicState.cursor,
                  ...basicBgStyle
                }"
              >
                <div class="flex items-center gap-1.5 font-bold text-xs mb-1">
                  <span>✨</span>
                  <span>元件本體</span>
                  <span class="text-[9px] bg-black/30 px-1.5 py-0.5 rounded-full font-mono">{{ basicState.display }}</span>
                </div>
                <p class="text-[10px] text-white/90 leading-snug">
                  {{ basicState.sampleText }}
                </p>
              </div>

              <!-- When display: none is active -->
              <span v-else class="inline-block px-3 py-1 rounded-lg border border-dashed border-rose-500 bg-rose-500/10 text-rose-500 text-xs font-mono">
                [元素已設定 display: none，已自頁面空間中徹底消失！]
              </span>

              <span class="text-xs text-slate-400 select-none ml-2 font-mono">...文檔接續後綴文字</span>
            </div>

            <!-- Real-time characteristic callout -->
            <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span class="text-emerald-500 font-bold">● 特性解說：</span>
              <span v-if="basicState.display === 'block'"><code>block</code> 獨占完整一行，即使寬度縮小，前後文字也必須強制換行。</span>
              <span v-else-if="basicState.display === 'inline'"><code>inline</code> 緊貼相鄰文字並排，寬高限制完全失效。</span>
              <span v-else-if="basicState.display === 'inline-block'"><code>inline-block</code> 兼具並排於文字流、同時保有自由設定寬高圓角的優勢！</span>
              <span v-else><code>none</code> 完全脫離渲染樹，不佔用任何像素空間。</span>
            </div>
          </div>
        </div>

        <!-- Generated CSS Code Box -->
        <div class="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 p-4 shadow-xs font-mono text-xs">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span class="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
              <span>CSS 生效代碼</span>
            </span>
            <button
              @click="copyBasicCss"
              class="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-lg"
            >
              <Check v-if="isBasicCopied" class="h-3 w-3 text-emerald-400" />
              <Copy v-else class="h-3 w-3" />
              <span>{{ isBasicCopied ? '已複製！' : '複製代碼' }}</span>
            </button>
          </div>
          <pre class="overflow-x-auto text-emerald-300/90 text-xs leading-relaxed"><code>{{ generatedBasicCss }}</code></pre>
        </div>
      </div>
    </div>

    <!-- TAB 2: FLEXBOX PLAYGROUND -->
    <div v-else-if="activeTab === 'flex'" class="grid gap-6 lg:grid-cols-3">
      <!-- Flex Controls -->
      <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-5 backdrop-blur-md space-y-4 text-xs shadow-xs dark:shadow-none transition-colors">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <span class="font-bold text-slate-800 dark:text-slate-200">Flex 容器參數</span>
          <button @click="resetFlex" class="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors">
            <RotateCcw class="h-3 w-3" /> 重設
          </button>
        </div>

        <!-- flex-direction -->
        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">主軸方向 (flex-direction)</label>
          <div class="grid grid-cols-2 gap-1.5 font-mono">
            <button
              v-for="d in ['row', 'column']"
              :key="d"
              @click="flexState.flexDirection = d"
              class="rounded-lg border p-1.5 text-center transition-all"
              :class="flexState.flexDirection === d ? 'border-indigo-500 bg-indigo-500/20 text-indigo-950 dark:text-white font-bold ring-1 ring-indigo-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              {{ d }}
            </button>
          </div>
        </div>

        <!-- justify-content -->
        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">主軸對齊 (justify-content)</label>
          <div class="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
            <button
              v-for="j in ['flex-start', 'center', 'flex-end', 'space-between', 'space-around']"
              :key="j"
              @click="flexState.justifyContent = j"
              class="rounded-lg border p-1.5 text-center truncate transition-all"
              :class="flexState.justifyContent === j ? 'border-indigo-500 bg-indigo-500/20 text-indigo-950 dark:text-white font-bold ring-1 ring-indigo-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              {{ j }}
            </button>
          </div>
        </div>

        <!-- align-items -->
        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">交叉軸對齊 (align-items)</label>
          <div class="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
            <button
              v-for="a in ['stretch', 'center', 'flex-start', 'flex-end']"
              :key="a"
              @click="flexState.alignItems = a"
              class="rounded-lg border p-1.5 text-center truncate transition-all"
              :class="flexState.alignItems === a ? 'border-indigo-500 bg-indigo-500/20 text-indigo-950 dark:text-white font-bold ring-1 ring-indigo-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              {{ a }}
            </button>
          </div>
        </div>

        <!-- gap -->
        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>現代間距 (gap):</span>
            <span class="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{{ flexState.gap }}px</span>
          </div>
          <input type="range" min="0" max="40" step="4" v-model.number="flexState.gap" class="w-full accent-indigo-600" />
        </div>

        <!-- Add / remove items -->
        <div class="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-3">
          <span class="text-slate-700 dark:text-slate-300 font-medium">子項目數量: ({{ flexState.itemCount }})</span>
          <div class="flex items-center gap-1.5">
            <button
              @click="flexState.itemCount = Math.max(1, flexState.itemCount - 1)"
              class="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:text-white transition-colors"
            >
              -
            </button>
            <button
              @click="flexState.itemCount = Math.min(8, flexState.itemCount + 1)"
              class="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:text-white transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Live Flex Stage -->
      <div class="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950/80 p-5 flex flex-col justify-center min-h-[380px] overflow-hidden shadow-xs dark:shadow-none transition-colors">
        <div
          class="w-full h-full min-h-[300px] border border-dashed border-indigo-400/60 dark:border-indigo-500/40 rounded-xl p-4 transition-all duration-300 bg-white/70 dark:bg-transparent"
          :style="{
            display: 'flex',
            flexDirection: flexState.flexDirection,
            justifyContent: flexState.justifyContent,
            alignItems: flexState.alignItems,
            flexWrap: flexState.flexWrap,
            gap: flexState.gap + 'px'
          }"
        >
          <div
            v-for="n in flexState.itemCount"
            :key="n"
            class="flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 font-bold text-white shadow-md transition-all"
            :style="{
              width: flexState.flexDirection === 'column' ? '100%' : '80px',
              height: '70px'
            }"
          >
            項目 {{ n }}
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: ANIMATION LAB -->
    <div v-else-if="activeTab === 'animation'" class="grid gap-6 lg:grid-cols-2">
      <!-- Animation Controls -->
      <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-5 backdrop-blur-md space-y-4 text-xs shadow-xs dark:shadow-none transition-colors">
        <div class="font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">@keyframes 動畫軌跡設定</div>
        
        <div>
          <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">動畫類型：</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="t in ['spin', 'pulse', 'bounce']"
              :key="t"
              @click="animState.type = t"
              class="rounded-lg border p-2 text-center font-mono transition-all"
              :class="animState.type === t ? 'border-pink-500 bg-pink-500/20 text-pink-950 dark:text-white font-bold ring-1 ring-pink-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
            >
              {{ t }}
            </button>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>動畫週期 (duration):</span>
            <span class="font-mono text-pink-600 dark:text-pink-400 font-bold">{{ animState.duration }}s</span>
          </div>
          <input type="range" min="0.4" max="4.0" step="0.2" v-model.number="animState.duration" class="w-full accent-pink-600" />
        </div>
      </div>

      <!-- Animation Live Preview -->
      <div class="rounded-2xl border border-slate-200 bg-slate-100/90 dark:border-slate-800 dark:bg-slate-950/80 p-6 flex flex-col items-center justify-center min-h-[280px] shadow-xs dark:shadow-none transition-colors">
        <div
          class="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-3xl text-white shadow-2xl transition-all"
          :class="{
            'animate-spin': animState.type === 'spin',
            'animate-pulse': animState.type === 'pulse',
            'animate-bounce': animState.type === 'bounce'
          }"
          :style="{ animationDuration: animState.duration + 's' }"
        >
          ✨
        </div>
        <div class="mt-6 font-mono text-xs text-pink-600 dark:text-pink-300 font-semibold">
          animation: {{ animState.type }} {{ animState.duration }}s {{ animState.timing }} infinite;
        </div>
      </div>
    </div>
  </div>
</template>
