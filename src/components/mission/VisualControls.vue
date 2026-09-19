<script setup>
import { Sliders, RotateCcw, Sparkles, Smartphone, Tablet, Monitor, LayoutGrid, Columns, Type } from 'lucide-vue-next'

const props = defineProps({
  missionId: { type: String, required: true },
  state: { type: Object, required: true }
})

const emit = defineEmits(['update:state', 'resetState'])

function setVal(key, val) {
  emit('update:state', { ...props.state, [key]: val })
}

function toggleClass(className) {
  const current = [...(props.state.selectedClasses || [])]
  const idx = current.indexOf(className)
  if (idx > -1) {
    current.splice(idx, 1)
  } else {
    current.push(className)
  }
  emit('update:state', { ...props.state, selectedClasses: current })
}
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-xs dark:shadow-none transition-colors duration-200">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <Sliders class="h-4 w-4 text-purple-600 dark:text-purple-400" />
        <h2 class="text-sm font-bold tracking-tight text-slate-900 dark:text-white uppercase">視覺控制器 (Visual Controls)</h2>
      </div>
      <button
        @click="emit('resetState')"
        class="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        title="重設為關卡初始值"
      >
        <RotateCcw class="h-3.5 w-3.5" />
        <span>重設</span>
      </button>
    </div>

    <!-- MISSION 1 CONTROLS: Box Model & Specificity -->
    <div v-if="missionId === 'mission-1'" class="space-y-4 text-xs">
      <!-- box-sizing toggle -->
      <div>
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          1. 盒模型計算模式 (box-sizing)
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="setVal('boxSizing', 'content-box')"
            class="rounded-xl border p-2.5 text-center font-mono font-semibold transition-all"
            :class="state.boxSizing === 'content-box' ? 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-300 ring-1 ring-rose-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 hover:bg-slate-200/80 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400 dark:hover:border-slate-700'"
          >
            content-box (預設)
            <div class="text-[10px] font-sans font-normal text-slate-500 dark:text-slate-400 mt-0.5">容易向外撐爆破版</div>
          </button>
          <button
            @click="setVal('boxSizing', 'border-box')"
            class="rounded-xl border p-2.5 text-center font-mono font-semibold transition-all"
            :class="state.boxSizing === 'border-box' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 hover:bg-slate-200/80 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400 dark:hover:border-slate-700'"
          >
            border-box (推薦)
            <div class="text-[10px] font-sans font-normal text-emerald-600 dark:text-emerald-400 mt-0.5">鎖死總寬向內壓縮</div>
          </button>
        </div>
      </div>

      <!-- Padding slider -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>2. 內留白 (padding):</span>
          <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.padding }}px</span>
        </div>
        <input
          type="range"
          min="8"
          max="48"
          step="2"
          :value="state.padding"
          @input="setVal('padding', Number($event.target.value))"
          class="w-full accent-purple-600"
        />
      </div>

      <!-- Border Width slider -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>3. 邊框寬度 (border-width):</span>
          <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.borderWidth }}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          :value="state.borderWidth"
          @input="setVal('borderWidth', Number($event.target.value))"
          class="w-full accent-purple-600"
        />
      </div>

      <!-- Specificity selector -->
      <div>
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          4. 標題選擇器優先級 (Specificity 天梯)
        </label>
        <div class="space-y-1.5">
          <label
            @click="setVal('selectorType', 'tag')"
            class="flex items-center justify-between rounded-lg border p-2 cursor-pointer transition-all"
            :class="state.selectorType === 'tag' ? 'border-purple-500 bg-purple-500/15 text-purple-900 dark:text-white font-bold ring-1 ring-purple-500/30' : 'border-slate-200 bg-slate-100/70 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400'"
          >
            <span class="font-mono">h2 { color: #64748b; }</span>
            <span class="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300">標籤 1 分</span>
          </label>
          <label
            @click="setVal('selectorType', 'class')"
            class="flex items-center justify-between rounded-lg border p-2 cursor-pointer transition-all"
            :class="state.selectorType === 'class' ? 'border-purple-500 bg-purple-500/15 text-purple-900 dark:text-white font-bold ring-1 ring-purple-500/30' : 'border-slate-200 bg-slate-100/70 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400'"
          >
            <span class="font-mono">.poster-title { color: #ec4899; }</span>
            <span class="rounded bg-indigo-100 dark:bg-indigo-900/60 border border-indigo-300 dark:border-indigo-500/40 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">類別 10 分</span>
          </label>
          <label
            @click="setVal('selectorType', 'id')"
            class="flex items-center justify-between rounded-lg border p-2 cursor-pointer transition-all"
            :class="state.selectorType === 'id' ? 'border-purple-500 bg-purple-500/15 text-purple-900 dark:text-white font-bold ring-1 ring-purple-500/30' : 'border-slate-200 bg-slate-100/70 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400'"
          >
            <span class="font-mono">#vip-title { color: #38bdf8; }</span>
            <span class="rounded bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-500/40 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300">ID 100 分 (壓勝)</span>
          </label>
        </div>
      </div>
    </div>

    <!-- MISSION 2 CONTROLS: Gradient, Shadow, Hover, Spinner -->
    <div v-else-if="missionId === 'mission-2'" class="space-y-4 text-xs">
      <!-- Gradient Angle & Colors -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>1. 漸層角度 (linear-gradient):</span>
          <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.gradientAngle }}deg</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          step="15"
          :value="state.gradientAngle"
          @input="setVal('gradientAngle', Number($event.target.value))"
          class="w-full accent-purple-600"
        />
        <div class="flex items-center gap-2 mt-2">
          <span class="text-slate-600 dark:text-slate-400">漸層色：</span>
          <input type="color" :value="state.colorFrom" @input="setVal('colorFrom', $event.target.value)" class="h-6 w-8 rounded border border-slate-300 dark:border-slate-700 bg-transparent cursor-pointer" />
          <span class="text-slate-400 dark:text-slate-500">➔</span>
          <input type="color" :value="state.colorTo" @input="setVal('colorTo', $event.target.value)" class="h-6 w-8 rounded border border-slate-300 dark:border-slate-700 bg-transparent cursor-pointer" />
        </div>
      </div>

      <!-- Border Radius -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>2. 圓角 (border-radius):</span>
          <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.borderRadius }}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="32"
          step="2"
          :value="state.borderRadius"
          @input="setVal('borderRadius', Number($event.target.value))"
          class="w-full accent-purple-600"
        />
      </div>

      <!-- Box Shadow Blur -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>3. 浮空陰影模糊半徑 (box-shadow blur):</span>
          <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.shadowBlur }}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="35"
          step="1"
          :value="state.shadowBlur"
          @input="setVal('shadowBlur', Number($event.target.value))"
          class="w-full accent-purple-600"
        />
      </div>

      <!-- Hover Translate & Transition Duration -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>Hover 上浮:</span>
            <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.hoverTranslateY }}px</span>
          </div>
          <input
            type="range"
            min="-10"
            max="0"
            step="1"
            :value="state.hoverTranslateY"
            @input="setVal('hoverTranslateY', Number($event.target.value))"
            class="w-full accent-purple-600"
          />
        </div>
        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>轉場時長:</span>
            <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.transitionDuration }}s</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="0.8"
            step="0.05"
            :value="state.transitionDuration"
            @input="setVal('transitionDuration', Number($event.target.value))"
            class="w-full accent-purple-600"
          />
        </div>
      </div>

      <!-- Spinner keyframes toggle -->
      <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
        <label class="flex items-center justify-between cursor-pointer">
          <span class="font-semibold text-slate-700 dark:text-slate-300">純 CSS @keyframes 旋轉載入圈:</span>
          <input
            type="checkbox"
            :checked="state.isSpinning"
            @change="setVal('isSpinning', $event.target.checked)"
            class="h-4 w-4 rounded accent-purple-600"
          />
        </label>
      </div>
    </div>

    <!-- MISSION 3 CONTROLS: Modern RWD, Breakpoints, Grid & Fluid -->
    <div v-else-if="missionId === 'mission-3'" class="space-y-4 text-xs">
      <!-- 1. Layout Engine Strategy Switcher -->
      <div>
        <label class="font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
          <span>1. RWD 響應式佈局策略</span>
          <span class="text-[10px] text-purple-600 dark:text-purple-400 font-normal">雙核心架構對照</span>
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="emit('update:state', { ...state, layoutEngine: 'flex', display: 'flex' })"
            class="flex items-center justify-center gap-1.5 rounded-xl border p-2 text-center font-semibold transition-all"
            :class="(state.layoutEngine || 'flex') === 'flex' ? 'border-purple-500 bg-purple-500/15 text-purple-900 dark:text-white ring-1 ring-purple-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            <Columns class="h-3.5 w-3.5" />
            Flexbox 斷點流
          </button>
          <button
            @click="emit('update:state', { ...state, layoutEngine: 'grid', display: 'grid' })"
            class="flex items-center justify-center gap-1.5 rounded-xl border p-2 text-center font-semibold transition-all"
            :class="state.layoutEngine === 'grid' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            <LayoutGrid class="h-3.5 w-3.5" />
            Grid 現代自適應流
          </button>
        </div>
      </div>

      <!-- 2A. Sub-controls for Flexbox mode -->
      <div v-if="(state.layoutEngine || 'flex') === 'flex'" class="space-y-3 rounded-xl border border-purple-500/20 bg-purple-50/50 dark:bg-purple-950/20 p-3">
        <div class="flex items-center justify-between text-[11px] font-bold text-purple-700 dark:text-purple-300 border-b border-purple-500/20 pb-1.5">
          <span>Flexbox + Mobile-First @media 斷點</span>
          <span class="text-[10px] font-mono font-normal">min-width 階梯覆蓋</span>
        </div>

        <!-- Display mode -->
        <div>
          <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">排版模式 (display)</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="setVal('display', 'block')"
              class="rounded-lg border p-1.5 text-center font-mono font-semibold transition-all"
              :class="state.display === 'block' ? 'border-purple-500 bg-purple-500/15 text-purple-900 dark:text-white' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
            >
              block (傳統單向)
            </button>
            <button
              @click="setVal('display', 'flex')"
              class="rounded-lg border p-1.5 text-center font-mono font-semibold transition-all"
              :class="state.display === 'flex' ? 'border-purple-500 bg-purple-500/20 text-purple-900 dark:text-white font-bold ring-1 ring-purple-500/40' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
            >
              flex (彈性排版)
            </button>
          </div>
        </div>

        <!-- Flex Wrap -->
        <div>
          <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">自動折行 (flex-wrap)</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="setVal('flexWrap', 'nowrap')"
              class="rounded-lg border p-1.5 text-center font-mono transition-all"
              :class="state.flexWrap === 'nowrap' ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
            >
              nowrap (硬擠單行)
            </button>
            <button
              @click="setVal('flexWrap', 'wrap')"
              class="rounded-lg border p-1.5 text-center font-mono font-bold transition-all"
              :class="state.flexWrap === 'wrap' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/40' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
            >
              wrap (智慧換行)
            </button>
          </div>
        </div>

        <!-- Justify content -->
        <div>
          <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">主軸對齊 (justify-content)</label>
          <div class="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
            <button
              v-for="j in ['flex-start', 'center', 'space-between']"
              :key="j"
              @click="setVal('justifyContent', j)"
              class="rounded-lg border p-1.5 text-center transition-all"
              :class="state.justifyContent === j ? 'border-purple-500 bg-purple-500/20 text-purple-900 dark:text-white font-bold ring-1 ring-purple-500/40' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
            >
              {{ j }}
            </button>
          </div>
        </div>
      </div>

      <!-- 2B. Sub-controls for CSS Grid mode -->
      <div v-else-if="state.layoutEngine === 'grid'" class="space-y-3 rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
        <div class="flex items-center justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border-b border-emerald-500/20 pb-1.5">
          <span>CSS Grid 現代無斷點流體自適應</span>
          <span class="text-[10px] font-mono font-normal">repeat(auto-fit, minmax)</span>
        </div>

        <!-- Grid Auto-fit toggle -->
        <div>
          <label class="block font-medium text-slate-700 dark:text-slate-300 mb-1">欄位分配規則 (grid-template-columns)</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="setVal('gridAutoFit', false)"
              class="rounded-lg border p-1.5 text-center font-mono transition-all text-[11px]"
              :class="!state.gridAutoFit ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
            >
              repeat(4, 1fr)<br><span class="text-[10px] font-normal opacity-80">(固定4欄・窄螢幕擠扁)</span>
            </button>
            <button
              @click="setVal('gridAutoFit', true)"
              class="rounded-lg border p-1.5 text-center font-mono font-bold transition-all text-[11px]"
              :class="state.gridAutoFit ? 'border-emerald-500 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/40' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
            >
              auto-fit + minmax<br><span class="text-[10px] font-normal opacity-80">(智能折行・免寫斷點)</span>
            </button>
          </div>
        </div>

        <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          💡 <span class="font-bold text-emerald-600 dark:text-emerald-400">auto-fit 魔法：</span>當每個卡片寬度低於 200px 臨界點時，瀏覽器自動收縮並跳至下一行，完美實現響應式自適應！
        </p>
      </div>

      <!-- 3. Gap Slider -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>2. 元件呼吸間距 (gap):</span>
          <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.gap }}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="32"
          step="4"
          :value="state.gap"
          @input="setVal('gap', Number($event.target.value))"
          class="w-full accent-purple-600"
        />
      </div>

      <!-- 4. Fluid Typography with clamp() -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 p-3">
        <div class="flex items-center justify-between mb-1.5">
          <label class="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Type class="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            3. 現代流體動態字級 (clamp)
          </label>
          <span class="font-mono text-[10px] px-1.5 py-0.5 rounded" :class="state.fluidTypography ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'">
            {{ state.fluidTypography ? 'clamp() 開啟' : '固定 14px' }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="setVal('fluidTypography', false)"
            class="rounded-lg border p-1.5 text-center font-mono text-[11px] transition-all"
            :class="!state.fluidTypography ? 'border-purple-500 bg-purple-500/15 text-purple-900 dark:text-white font-bold' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
          >
            固定字級 (14px)
          </button>
          <button
            @click="setVal('fluidTypography', true)"
            class="rounded-lg border p-1.5 text-center font-mono text-[11px] font-bold transition-all"
            :class="state.fluidTypography ? 'border-purple-500 bg-purple-500/20 text-purple-900 dark:text-white ring-1 ring-purple-500/40' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'"
          >
            clamp(0.85rem, 2vw, 1.2rem)
          </button>
        </div>
        <p class="mt-1.5 text-[10px] text-slate-500 dark:text-slate-400">
          字體隨螢幕寬度連續線性平滑縮放，不再出現斷點切換瞬間的生硬跳動！
        </p>
      </div>

      <!-- 5. Viewport Width Quick Switcher -->
      <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
          <span>4. 模擬 Viewport 視窗寬度:</span>
          <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.viewportWidth }}px</span>
        </div>
        <div class="grid grid-cols-3 gap-1.5 mb-2">
          <button
            @click="setVal('viewportWidth', 390)"
            class="flex items-center justify-center gap-1 rounded-lg border p-1.5 text-[11px] transition-colors"
            :class="state.viewportWidth <= 640 ? 'border-purple-500 bg-purple-500/20 text-purple-800 dark:text-purple-300 font-bold' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            <Smartphone class="h-3 w-3" /> 手機 390px
          </button>
          <button
            @click="setVal('viewportWidth', 768)"
            class="flex items-center justify-center gap-1 rounded-lg border p-1.5 text-[11px] transition-colors"
            :class="state.viewportWidth > 640 && state.viewportWidth <= 800 ? 'border-purple-500 bg-purple-500/20 text-purple-800 dark:text-purple-300 font-bold' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            <Tablet class="h-3 w-3" /> 平板 768px
          </button>
          <button
            @click="setVal('viewportWidth', 1024)"
            class="flex items-center justify-center gap-1 rounded-lg border p-1.5 text-[11px] transition-colors"
            :class="state.viewportWidth > 800 ? 'border-purple-500 bg-purple-500/20 text-purple-800 dark:text-purple-300 font-bold' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            <Monitor class="h-3 w-3" /> 桌機 1024px
          </button>
        </div>
        <input
          type="range"
          min="360"
          max="1024"
          step="10"
          :value="state.viewportWidth"
          @input="setVal('viewportWidth', Number($event.target.value))"
          class="w-full accent-purple-600"
        />
      </div>
    </div>

    <!-- MISSION 4 CONTROLS: Tailwind & AI -->
    <div v-else-if="missionId === 'mission-4'" class="space-y-4 text-xs">
      <div>
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-2">
          1. 點擊組合 Tailwind 4 原子類別 (Utility Chips)
        </label>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="cls in [
              'flex', 'flex-col', 'items-center', 'p-6', 'rounded-2xl',
              'bg-slate-900/80', 'backdrop-blur-md', 'border', 'border-purple-500/30',
              'shadow-xl', 'shadow-purple-500/20', 'hover:-translate-y-1.5', 'transition', 'duration-300'
            ]"
            :key="cls"
            @click="toggleClass(cls)"
            class="rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-all"
            :class="state.selectedClasses.includes(cls) ? 'border-purple-500 bg-purple-500/25 text-purple-800 dark:text-purple-200 font-bold ring-1 ring-purple-500/50' : 'border-slate-200 bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400 dark:hover:text-white'"
          >
            {{ cls }}
          </button>
        </div>
      </div>

      <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">2. AI 提示詞 (Prompt) 詠唱範本</label>
        <div class="rounded-xl border border-purple-300 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20 p-3">
          <p class="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
            「請使用 HTML 與 Tailwind CSS 4，幫我設計一個深色模式、具備磨砂玻璃、懸停上浮 -translate-y-1.5 與 GPU 硬體加速的資訊社展示卡片」
          </p>
          <button
            @click="setVal('aiPromptCopied', true)"
            class="mt-2.5 flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-1 text-xs font-bold text-white hover:bg-purple-500 transition-colors shadow-xs"
          >
            <Sparkles class="h-3 w-3" />
            <span>{{ state.aiPromptCopied ? '已複製 AI Prompt！' : '一鍵複製 Prompt' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MISSION 5 CONTROLS: Position & Stacking Context -->
    <div v-else-if="missionId === 'mission-5'" class="space-y-4 text-xs">
      <!-- 1. 父容器定位模式 -->
      <div>
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          1. 父卡片定位模式 (position: relative 錨點)
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="setVal('parentPosition', 'static')"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="state.parentPosition === 'static' ? 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-300 ring-1 ring-rose-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            static (預設無錨點)
            <div class="text-[10px] font-sans font-normal text-slate-500 dark:text-slate-400 mt-0.5">子元素會飄到視窗頂部</div>
          </button>
          <button
            @click="setVal('parentPosition', 'relative')"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="state.parentPosition === 'relative' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            relative (推薦錨定)
            <div class="text-[10px] font-sans font-normal text-emerald-600 dark:text-emerald-400 mt-0.5">將座標原點鎖定在父層</div>
          </button>
        </div>
      </div>

      <!-- 2. 徽章定位模式 -->
      <div>
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          2. 紅點通知徽章定位 (position: absolute)
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="setVal('badgePosition', 'static')"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="state.badgePosition === 'static' ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            static (在文檔流中)
          </button>
          <button
            @click="setVal('badgePosition', 'absolute')"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="state.badgePosition === 'absolute' ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            absolute (自由浮動懸空)
          </button>
        </div>
      </div>

      <!-- 3. Top & Right 偏移滑桿 -->
      <div v-if="state.badgePosition === 'absolute'" class="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>top 偏移:</span>
            <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.badgeTop }}px</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            :value="state.badgeTop"
            @input="setVal('badgeTop', Number($event.target.value))"
            class="w-full accent-purple-600"
          />
        </div>
        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>right 偏移:</span>
            <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.badgeRight }}px</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            :value="state.badgeRight"
            @input="setVal('badgeRight', Number($event.target.value))"
            class="w-full accent-purple-600"
          />
        </div>
      </div>

      <!-- 4. z-index 圖層滑桿 -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>4. 圖層優先級 (z-index):</span>
          <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">{{ state.badgeZIndex }}</span>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          :value="state.badgeZIndex"
          @input="setVal('badgeZIndex', Number($event.target.value))"
          class="w-full accent-purple-600"
        />
        <div class="flex justify-between text-[10px] text-slate-400 mt-0.5">
          <span>1 (可能被圖片遮擋)</span>
          <span>10+ (浮出最上層)</span>
        </div>
      </div>

      <!-- 5. sticky 導航列開關 -->
      <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          5. 分類導航列吸頂 (position: sticky)
        </label>
        <button
          @click="setVal('stickyEnabled', !state.stickyEnabled)"
          class="w-full rounded-xl border p-2.5 text-center font-mono font-semibold transition-all flex items-center justify-center gap-2"
          :class="state.stickyEnabled ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
        >
          <span>{{ state.stickyEnabled ? '✓ position: sticky (吸頂啟用中)' : '✕ position: static (常規隨頁面捲走)' }}</span>
        </button>
      </div>
    </div>

    <!-- MISSION 6 CONTROLS: 3D Transforms & Perspective -->
    <div v-else-if="missionId === 'mission-6'" class="space-y-4 text-xs">
      <!-- 1. 透視視距 -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>1. 外層透視深度 (perspective):</span>
          <span class="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{{ state.perspective ? `${state.perspective}px` : 'none (2D 扁平)' }}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1200"
          step="50"
          :value="state.perspective"
          @input="setVal('perspective', Number($event.target.value))"
          class="w-full accent-cyan-600"
        />
        <div class="flex justify-between text-[10px] text-slate-400 mt-0.5">
          <span>0 (無透視)</span>
          <span>800px (最佳立體視距)</span>
          <span>1200px (柔和深度)</span>
        </div>
      </div>

      <!-- 2. preserve-3d 開關 -->
      <div>
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          2. 三維空間維持 (transform-style)
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="setVal('preserve3d', false)"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="!state.preserve3d ? 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-300 ring-1 ring-rose-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            flat (子層被壓扁)
          </button>
          <button
            @click="setVal('preserve3d', true)"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="state.preserve3d ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            preserve-3d (保持立體空間)
          </button>
        </div>
      </div>

      <!-- 3. rotateX 與 rotateY 空間角度 -->
      <div class="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>rotateX (上下):</span>
            <span class="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{{ state.rotateX }}deg</span>
          </div>
          <input
            type="range"
            min="-40"
            max="40"
            step="2"
            :value="state.rotateX"
            @input="setVal('rotateX', Number($event.target.value))"
            class="w-full accent-cyan-600"
          />
        </div>
        <div>
          <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span>rotateY (左右):</span>
            <span class="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{{ state.rotateY }}deg</span>
          </div>
          <input
            type="range"
            min="-40"
            max="40"
            step="2"
            :value="state.rotateY"
            @input="setVal('rotateY', Number($event.target.value))"
            class="w-full accent-cyan-600"
          />
        </div>
      </div>

      <!-- 4. translateZ 深度懸浮位移 -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>4. Z 軸空間凸起 (translateZ):</span>
          <span class="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{{ state.translateZ }}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="2"
          :value="state.translateZ"
          @input="setVal('translateZ', Number($event.target.value))"
          class="w-full accent-cyan-600"
        />
      </div>

      <!-- 5. 180度卡片翻轉體驗 -->
      <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          5. 觸發 180° 卡片正反雙面翻轉 (Card Flip)
        </label>
        <button
          @click="setVal('isFlipped', !state.isFlipped)"
          class="w-full rounded-xl border p-2.5 text-center font-mono font-semibold transition-all flex items-center justify-center gap-2"
          :class="state.isFlipped ? 'border-purple-500 bg-purple-500/15 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
        >
          <span>{{ state.isFlipped ? '🔄 目前翻轉為：背面 (Backface 180°)' : '🔄 目前顯示為：正面 (Front 0°)' }}</span>
        </button>
      </div>
    </div>

    <!-- MISSION 7 CONTROLS: Keyframes & Scroll Drivers -->
    <div v-else-if="missionId === 'mission-7'" class="space-y-4 text-xs">
      <!-- 1. 發光脈衝半徑 -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>1. 呼吸脈衝光暈半徑 (Glow Spread):</span>
          <span class="font-mono text-sky-600 dark:text-sky-400 font-bold">{{ state.glowSpread }}px</span>
        </div>
        <input
          type="range"
          min="4"
          max="32"
          step="2"
          :value="state.glowSpread"
          @input="setVal('glowSpread', Number($event.target.value))"
          class="w-full accent-sky-500"
        />
      </div>

      <!-- 2. 動畫計時函式 -->
      <div>
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          2. 計時過渡函式 (animation-timing-function)
        </label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="tf in ['linear', 'ease', 'ease-in-out']"
            :key="tf"
            @click="setVal('timingFunction', tf)"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="state.timingFunction === tf ? 'border-sky-500 bg-sky-500/15 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/30 font-bold' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            {{ tf }}
          </button>
        </div>
      </div>

      <!-- 3. 動畫方向 (alternate) -->
      <div>
        <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          3. 循環方向 (animation-direction)
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="setVal('animationDirection', 'normal')"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="state.animationDirection === 'normal' ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            normal (播完瞬跳重置)
          </button>
          <button
            @click="setVal('animationDirection', 'alternate')"
            class="rounded-xl border p-2 text-center font-mono font-semibold transition-all"
            :class="state.animationDirection === 'alternate' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-slate-100/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400'"
          >
            alternate (平滑呼吸往返)
          </button>
        </div>
      </div>

      <!-- 4. 動畫週期時長 -->
      <div>
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>4. 呼吸週期 (animation-duration):</span>
          <span class="font-mono text-sky-600 dark:text-sky-400 font-bold">{{ state.animationDuration }}s</span>
        </div>
        <input
          type="range"
          min="0.8"
          max="3.5"
          step="0.2"
          :value="state.animationDuration"
          @input="setVal('animationDuration', Number($event.target.value))"
          class="w-full accent-sky-500"
        />
      </div>

      <!-- 5. 模擬滾動進度條 -->
      <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
        <div class="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
          <span>5. 模擬閱讀滾動進度 (Scroll Progress):</span>
          <span class="font-mono text-sky-600 dark:text-sky-400 font-bold">{{ state.scrollProgress }}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          :value="state.scrollProgress"
          @input="setVal('scrollProgress', Number($event.target.value))"
          class="w-full accent-sky-500"
        />
      </div>
    </div>
  </div>
</template>
