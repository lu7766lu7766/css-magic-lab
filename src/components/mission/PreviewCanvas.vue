<script setup>
import { computed, ref } from 'vue'
import { Eye, Smartphone, Tablet, Monitor, Sparkles, CheckCircle2, ShoppingBag, Bell, Zap } from 'lucide-vue-next'

const props = defineProps({
  missionId: { type: String, required: true },
  state: { type: Object, required: true }
})

const isHovered = ref(false)
const isSubmitted = ref(false)

// 計算海報總寬度
const posterTotalWidth = computed(() => {
  if (props.state.boxSizing === 'border-box') {
    return props.state.contentWidth
  }
  return props.state.contentWidth + (props.state.padding * 2) + (props.state.borderWidth * 2)
})

const isPosterOverflow = computed(() => {
  return props.state.boxSizing === 'content-box' && posterTotalWidth.value > 300
})

// 卡片清單（任務三）
const products = [
  { id: 1, title: '資訊社連帽 T-Shirt', tag: '熱銷第一', price: '$650', icon: '👕', color: 'from-purple-500/20 to-indigo-500/20' },
  { id: 2, title: '極限代碼防水貼紙', tag: '必收文具', price: '$120', icon: '🎨', color: 'from-pink-500/20 to-rose-500/20' },
  { id: 3, title: '客製機械軸體鍵帽', tag: '極限量款', price: '$350', icon: '⌨️', color: 'from-sky-500/20 to-blue-500/20' },
  { id: 4, title: '經典深色保溫隨行杯', tag: '新品上市', price: '$420', icon: '☕', color: 'from-amber-500/20 to-orange-500/20' }
]

function handleSubmit() {
  isSubmitted.value = true
  setTimeout(() => {
    isSubmitted.value = false
  }, 2500)
}
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-5 backdrop-blur-md flex flex-col h-full shadow-xs dark:shadow-none transition-colors duration-200">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
      <div class="flex items-center gap-2">
        <Eye class="h-4 w-4 text-purple-600 dark:text-purple-400" />
        <h2 class="text-sm font-bold uppercase tracking-tight text-slate-900 dark:text-white">即時渲染畫布 (Live Preview)</h2>
      </div>

      <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span class="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span>即時渲染中</span>
      </div>
    </div>

    <!-- Browser Sandbox Shell -->
    <div class="flex-1 rounded-xl border border-slate-200 bg-slate-100/90 dark:border-slate-800 dark:bg-slate-950/90 p-4 overflow-hidden flex flex-col items-center justify-center relative min-h-[420px] transition-colors duration-200">
      
      <!-- Top Window Dots -->
      <div class="absolute top-3 left-4 flex items-center gap-1.5 z-10">
        <span class="h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
      </div>

      <!-- MISSION 1: Exploding Poster Preview -->
      <div v-if="missionId === 'mission-1'" class="w-full flex flex-col items-center justify-center py-6">
        
        <!-- Max Container Guide (300px) -->
        <div class="relative w-[300px] border border-dashed border-slate-300 dark:border-slate-700/80 rounded-2xl p-2 pb-6 bg-white/80 dark:bg-slate-900/40 shadow-xs">
          <div class="text-[10px] text-center font-mono text-slate-500 dark:text-slate-400 mb-2">
            容器規格限制 (300px 寬度展示框)
          </div>

          <!-- The Poster Card with Live Box-Sizing & Padding -->
          <div
            class="mx-auto rounded-xl bg-slate-900 dark:bg-slate-800 text-slate-100 transition-all duration-300 relative shadow-md"
            :style="{
              boxSizing: state.boxSizing,
              width: state.contentWidth + 'px',
              padding: state.padding + 'px',
              borderWidth: state.borderWidth + 'px',
              borderStyle: 'solid',
              borderColor: isPosterOverflow ? '#ef4444' : '#f43f5e',
              margin: state.margin + 'px auto'
            }"
          >
            <!-- Badge -->
            <div class="inline-block rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300 mb-1">
              校園資訊社
            </div>

            <!-- Title: influenced by Specificity -->
            <h2
              class="font-extrabold tracking-tight transition-colors duration-200"
              :style="{
                fontSize: state.fontSizeRem + 'rem',
                color: state.selectorType === 'tag' ? '#94a3b8' : state.selectorType === 'class' ? '#ec4899' : '#38bdf8'
              }"
            >
              成果發表展
            </h2>

            <p class="text-xs text-slate-300 mt-1 leading-relaxed">
              歡迎全校師生蒞臨第二電腦教室！探索現代前端切版魔法。
            </p>

            <div class="mt-3 flex items-center justify-between border-t border-slate-700/60 pt-2 text-[10px] text-slate-400">
              <span>時間：週五下午</span>
              <span>地點：電腦教室</span>
            </div>

            <!-- Overflow Warning Tag -->
            <div
              v-if="isPosterOverflow"
              class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg animate-bounce"
            >
              ⚠️ 破版！總寬 {{ posterTotalWidth }}px 超過外框 300px！
            </div>
          </div>
        </div>

      </div>

      <!-- MISSION 2: Glowing Button & Spinner -->
      <div v-else-if="missionId === 'mission-2'" class="w-full flex flex-col items-center justify-center py-10">
        
        <div class="text-center mb-6">
          <h3 class="text-base font-bold text-slate-800 dark:text-white mb-1">社團活動報名系統</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">請試著將滑鼠懸停於按鈕上方感受平滑轉場！</p>
        </div>

        <button
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
          @click="handleSubmit"
          class="relative flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white transition-all select-none cursor-pointer shadow-md"
          :style="{
            background: `linear-gradient(${state.gradientAngle}deg, ${state.colorFrom}, ${state.colorTo})`,
            borderRadius: state.borderRadius + 'px',
            boxShadow: isHovered
              ? `0 ${state.shadowY + 8}px ${state.shadowBlur + 12}px rgba(99, 102, 241, 0.7)`
              : `0 ${state.shadowY}px ${state.shadowBlur}px rgba(99, 102, 241, 0.4)`,
            transform: isHovered ? `translateY(${state.hoverTranslateY}px)` : 'translateY(0)',
            transitionDuration: state.transitionDuration + 's'
          }"
        >
          <!-- Optional Spinner Inside Button -->
          <div
            v-if="state.isSpinning || isSubmitted"
            class="rounded-full animate-spin shrink-0"
            :style="{
              width: '16px',
              height: '16px',
              border: '2.5px solid rgba(255,255,255,0.3)',
              borderTopColor: state.spinnerColor,
              animationDuration: state.spinnerSpeed + 's'
            }"
          ></div>

          <Sparkles v-else class="h-4 w-4 text-yellow-300" />

          <span>{{ isSubmitted ? '報名成功！' : '立即報名成果展' }}</span>
        </button>

        <!-- Independent Keyframes Spinner Showcase -->
        <div v-if="state.isSpinning" class="mt-8 flex flex-col items-center gap-2">
          <div
            class="rounded-full animate-spin"
            :style="{
              width: '36px',
              height: '36px',
              border: '4px solid rgba(148,163,184,0.3)',
              borderTopColor: state.spinnerColor,
              animationDuration: state.spinnerSpeed + 's'
            }"
          ></div>
          <span class="text-[11px] font-mono text-sky-600 dark:text-sky-400">@keyframes spin: {{ state.spinnerSpeed }}s infinite</span>
        </div>

      </div>

      <!-- MISSION 3: Modern RWD, Breakpoints, Grid & Fluid Preview -->
      <div v-else-if="missionId === 'mission-3'" class="w-full flex flex-col items-center py-2 space-y-3">
        
        <!-- 1. Real-time Breakpoint Indicator & Ruler -->
        <div class="w-full max-w-xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-3 shadow-xs">
          <div class="flex items-center justify-between text-[11px] mb-2 font-medium">
            <span class="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-bold">
              <span class="inline-block h-2 w-2 rounded-full" :class="state.viewportWidth <= 640 ? 'bg-purple-500 animate-pulse' : state.viewportWidth < 1024 ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500 animate-pulse'"></span>
              即時斷點命中標尺 (Breakpoint Ruler)
            </span>
            <span class="font-mono font-bold text-purple-600 dark:text-purple-400">
              當前: {{ state.viewportWidth }}px
            </span>
          </div>

          <!-- Ruler Segments -->
          <div class="grid grid-cols-3 gap-1 text-[10px] font-mono text-center">
            <!-- Mobile Segment -->
            <div
              class="rounded-lg p-1.5 transition-all border"
              :class="state.viewportWidth <= 640
                ? 'border-purple-500 bg-purple-500/20 text-purple-900 dark:text-white font-bold ring-1 ring-purple-500/40 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-50 dark:bg-slate-950/40'"
            >
              <div class="font-bold flex items-center justify-center gap-1">📱 手機 Mobile</div>
              <div class="opacity-75">&lt; 640px (1欄滿版)</div>
            </div>

            <!-- Tablet Segment -->
            <div
              class="rounded-lg p-1.5 transition-all border"
              :class="state.viewportWidth > 640 && state.viewportWidth < 1024
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-900 dark:text-white font-bold ring-1 ring-indigo-500/40 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-50 dark:bg-slate-950/40'"
            >
              <div class="font-bold flex items-center justify-center gap-1">📟 平板 Tablet</div>
              <div class="opacity-75">@media &ge; 768px (2欄)</div>
            </div>

            <!-- Desktop Segment -->
            <div
              class="rounded-lg p-1.5 transition-all border"
              :class="state.viewportWidth >= 1024
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-900 dark:text-white font-bold ring-1 ring-emerald-500/40 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-50 dark:bg-slate-950/40'"
            >
              <div class="font-bold flex items-center justify-center gap-1">💻 桌機 Desktop</div>
              <div class="opacity-75">@media &ge; 1024px (4欄)</div>
            </div>
          </div>

          <!-- Active CSS Rule Summary -->
          <div class="mt-2.5 rounded-lg bg-slate-100 dark:bg-slate-950/80 px-2.5 py-1.5 text-[11px] flex items-center justify-between font-mono">
            <span class="text-slate-500 dark:text-slate-400">當前生效佈局：</span>
            <span v-if="(state.layoutEngine || 'flex') === 'flex'" class="font-bold text-purple-700 dark:text-purple-300">
              {{ state.display === 'block' ? '⚠️ block (垂直未折行)' : state.flexWrap === 'nowrap' ? '⚠️ nowrap (硬擠單行壓縮)' : state.viewportWidth <= 640 ? '📱 手機斷點：flex 1 1 100%' : state.viewportWidth < 1024 ? '📟 平板斷點：flex 1 1 50%' : '💻 桌機斷點：flex 1 1 25%' }}
            </span>
            <span v-else class="font-bold text-emerald-700 dark:text-emerald-300">
              {{ state.display === 'block' ? '⚠️ block (傳統區塊)' : state.gridAutoFit ? '⚡ Grid auto-fit 自適應' : '⚠️ Grid 固定 4 欄 (窄螢幕壓縮)' }}
            </span>
          </div>
        </div>

        <!-- 2. Viewport Width Simulation Frame -->
        <div
          class="transition-all duration-300 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-4 w-full shadow-md dark:shadow-2xl overflow-y-auto max-h-96"
          :style="{ maxWidth: state.viewportWidth + 'px' }"
        >
          <!-- Frame Header -->
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span class="font-bold text-slate-800 dark:text-white flex items-center gap-1">
              <ShoppingBag class="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
              周邊商品流 (寬度: {{ state.viewportWidth }}px)
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded" :class="state.fluidTypography ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'">
              {{ state.fluidTypography ? '✨ clamp() 流體動態字級' : '固定字級 13px' }}
            </span>
          </div>

          <!-- Product Cards Container (Flexbox or CSS Grid) -->
          <div
            v-if="(state.layoutEngine || 'flex') === 'flex'"
            :style="{
              display: state.display,
              flexDirection: state.flexDirection || 'row',
              flexWrap: state.flexWrap,
              justifyContent: state.justifyContent,
              alignItems: state.alignItems || 'stretch',
              gap: state.gap + 'px'
            }"
            :class="{ 'overflow-x-auto pb-2': state.display === 'flex' && state.flexWrap === 'nowrap' }"
          >
            <!-- Flex Cards -->
            <div
              v-for="p in products"
              :key="p.id"
              class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-3.5 transition-all shadow-2xs"
              :style="{
                flex: state.display === 'block'
                  ? 'none'
                  : state.flexWrap === 'nowrap'
                    ? '0 0 200px'
                    : state.viewportWidth <= 640
                      ? '1 1 100%'
                      : state.viewportWidth < 1024
                        ? `1 1 calc(50% - ${state.gap}px)`
                        : `1 1 calc(25% - ${state.gap}px)`,
                marginBottom: state.display === 'block' ? state.gap + 'px' : '0'
              }"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">{{ p.icon }}</span>
                <span class="rounded bg-purple-500/15 dark:bg-purple-500/20 px-1.5 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300">{{ p.tag }}</span>
              </div>
              <h4
                class="font-bold text-slate-800 dark:text-white truncate transition-all"
                :style="{
                  fontSize: state.fluidTypography
                    ? `clamp(0.8rem, ${Math.round(state.viewportWidth * 0.016)}px, 1.2rem)`
                    : '13px'
                }"
              >
                {{ p.title }}
              </h4>
              <div class="mt-2 flex items-center justify-between">
                <span class="font-mono text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{{ p.price }}</span>
                <button class="rounded-md bg-purple-600 px-2 py-1 text-[10px] font-bold text-white hover:bg-purple-500 shadow-xs">選購</button>
              </div>
            </div>
          </div>

          <!-- CSS Grid Container -->
          <div
            v-else-if="state.layoutEngine === 'grid'"
            :style="{
              display: state.display === 'block' ? 'block' : 'grid',
              gridTemplateColumns: state.display === 'block'
                ? 'none'
                : state.gridAutoFit
                  ? 'repeat(auto-fit, minmax(180px, 1fr))'
                  : 'repeat(4, 1fr)',
              gap: state.gap + 'px'
            }"
          >
            <!-- Grid Cards -->
            <div
              v-for="p in products"
              :key="p.id"
              class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-3.5 transition-all shadow-2xs"
              :style="{
                marginBottom: state.display === 'block' ? state.gap + 'px' : '0'
              }"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">{{ p.icon }}</span>
                <span class="rounded bg-emerald-500/15 dark:bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">{{ p.tag }}</span>
              </div>
              <h4
                class="font-bold text-slate-800 dark:text-white truncate transition-all"
                :style="{
                  fontSize: state.fluidTypography
                    ? `clamp(0.8rem, ${Math.round(state.viewportWidth * 0.016)}px, 1.2rem)`
                    : '13px'
                }"
              >
                {{ p.title }}
              </h4>
              <div class="mt-2 flex items-center justify-between">
                <span class="font-mono text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{{ p.price }}</span>
                <button class="rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white hover:bg-emerald-500 shadow-xs">選購</button>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- MISSION 4: Tailwind & AI Modern Component -->
      <div v-else-if="missionId === 'mission-4'" class="w-full flex flex-col items-center justify-center py-6">
        
        <div class="text-center mb-4">
          <span class="text-xs text-slate-500 dark:text-slate-400">當前套用的 Tailwind 4 Utility Classes：</span>
          <div class="mt-1 font-mono text-xs text-purple-700 dark:text-purple-300 font-bold bg-white dark:bg-slate-900/90 py-1 px-3 rounded-lg border border-purple-300 dark:border-purple-500/30 inline-block shadow-xs">
            {{ state.selectedClasses.join(' ') || '(無 class)' }}
          </div>
        </div>

        <!-- Rendered Element dynamically with selected classes -->
        <div
          :class="state.selectedClasses"
          class="max-w-sm text-center select-none cursor-pointer"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr from-purple-500 to-pink-500 text-2xl shadow-lg mb-3 mx-auto">
            🚀
          </div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">AI 世代前端架構</h3>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            告別手寫繁瑣 CSS，透過原子化積木與 AI Prompt 高效拼裝現代介面。
          </p>
          <div class="mt-4 flex items-center justify-center gap-2">
            <span class="rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              Zero Config
            </span>
            <span class="rounded-full bg-purple-500/15 dark:bg-purple-500/20 border border-purple-500/40 px-2.5 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300">
              Tailwind 4
            </span>
          </div>
        </div>

      </div>

      <!-- MISSION 5: Position & Stacking Context -->
      <div v-else-if="missionId === 'mission-5'" class="w-full flex flex-col items-center py-4 space-y-6">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
            <Bell class="h-3.5 w-3.5" />
            實戰場景：社團商城通知浮動徽章與 Sticky 分類吸頂
          </div>
        </div>

        <!-- 1. Notification Card with Absolute/Relative Anchor -->
        <div class="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-4">
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mb-2 flex justify-between">
            <span>外層父卡片容器 (.card-wrapper)</span>
            <span class="font-mono text-purple-600 dark:text-purple-400 font-bold">position: {{ state.parentPosition }}</span>
          </div>

          <!-- The Parent Card with dynamic position -->
          <div
            :style="{ position: state.parentPosition }"
            class="rounded-xl border-2 border-dashed border-indigo-400/60 dark:border-indigo-500/40 bg-white dark:bg-slate-950 p-4 transition-all"
          >
            <!-- Notification Badge with dynamic position -->
            <div
              :style="{
                position: state.badgePosition,
                top: state.badgePosition === 'absolute' ? `${state.badgeTop}px` : 'auto',
                right: state.badgePosition === 'absolute' ? `${state.badgeRight}px` : 'auto',
                zIndex: state.badgeZIndex
              }"
              class="flex items-center justify-center rounded-full bg-rose-500 text-white shadow-lg transition-all"
              :class="state.badgePosition === 'absolute' ? 'h-6 w-6 text-[10px] font-extrabold ring-2 ring-white dark:ring-slate-900' : 'inline-flex px-2 py-0.5 text-xs mb-2'"
            >
              <span v-if="state.badgePosition === 'absolute'">9+</span>
              <span v-else>未釘選徽章 (static)</span>
            </div>

            <!-- Card Content (with image & title) -->
            <div class="flex items-center gap-3">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-2xl shadow-md">
                🛍️
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate">社團紀念帽 T 訂單</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">已抵達活動中心快遞櫃，請儘速領取！</p>
              </div>
            </div>

            <div v-if="state.parentPosition === 'static' && state.badgePosition === 'absolute'" class="mt-2 rounded-lg bg-rose-500/10 border border-rose-500/30 p-2 text-[10px] text-rose-600 dark:text-rose-300">
              ⚠️ 父層為 static！徽章已脫離卡片邊界，往上相對於外層畫布定位了！請將父層設為 relative。
            </div>
            <div v-else-if="state.parentPosition === 'relative' && state.badgePosition === 'absolute'" class="mt-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2 text-[10px] text-emerald-600 dark:text-emerald-300">
              ✓ 完美錨定！父 relative + 子 absolute，紅點穩穩釘在卡片右上角。
            </div>
          </div>
        </div>

        <!-- 2. Sticky Scrollable Feed Demo -->
        <div class="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300">分類列表滾動吸頂演示 (請上下滾動查看)</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-md" :class="state.stickyEnabled ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'">
              {{ state.stickyEnabled ? 'sticky ON' : 'static' }}
            </span>
          </div>

          <div class="max-h-36 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 space-y-2 text-xs relative">
            <div class="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500">頂部橫幅：2026 社團科技生活節</div>
            
            <!-- Sticky Header -->
            <div
              :style="{
                position: state.stickyEnabled ? 'sticky' : 'static',
                top: '0px',
                zIndex: 20
              }"
              class="rounded-lg p-2 font-bold shadow-xs transition-all border"
              :class="state.stickyEnabled ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'"
            >
              📌 {{ state.stickyEnabled ? '已啟用 position: sticky (吸頂停留在頂部！)' : '未啟用吸頂 (會隨內容捲出視線)' }}
            </div>

            <div class="p-2 bg-slate-50 dark:bg-slate-900/70 rounded-lg">商品項目 1：聯名極光手環</div>
            <div class="p-2 bg-slate-50 dark:bg-slate-900/70 rounded-lg">商品項目 2：現代前端魔法卡片</div>
            <div class="p-2 bg-slate-50 dark:bg-slate-900/70 rounded-lg">商品項目 3：霧面金屬徽章套組</div>
            <div class="p-2 bg-slate-50 dark:bg-slate-900/70 rounded-lg">商品項目 4：紀念版極致代碼滑鼠墊</div>
          </div>
        </div>
      </div>

      <!-- MISSION 6: 3D Transforms & Perspective -->
      <div v-else-if="missionId === 'mission-6'" class="w-full flex flex-col items-center justify-center py-6">
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
            <Sparkles class="h-3.5 w-3.5" />
            實戰場景：3D 空間透視與雙面立體翻轉卡片 (Card Flip)
          </div>
          <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
            透視視距：<span class="font-mono font-bold text-cyan-600 dark:text-cyan-400">{{ state.perspective ? `${state.perspective}px` : '無 (2D 扁平)' }}</span> ｜ 
            空間模式：<span class="font-mono font-bold text-cyan-600 dark:text-cyan-400">{{ state.preserve3d ? 'preserve-3d' : 'flat' }}</span>
          </div>
        </div>

        <!-- 3D Perspective Stage Container -->
        <div
          class="flex items-center justify-center p-8 w-full"
          :style="{
            perspective: state.perspective ? `${state.perspective}px` : 'none'
          }"
        >
          <!-- Flip Card Wrapper -->
          <div
            class="relative w-64 h-84 cursor-pointer select-none transition-transform duration-500"
            :style="{
              transformStyle: state.preserve3d ? 'preserve-3d' : 'flat',
              transform: `rotateX(${state.rotateX}deg) rotateY(${state.rotateY + (state.isFlipped ? 180 : 0)}deg) translateZ(${state.translateZ}px)`
            }"
            @click="state.isFlipped = !state.isFlipped"
          >
            <!-- FRONT FACE -->
            <div
              class="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between border border-cyan-500/40 bg-linear-to-br from-slate-900 via-slate-800 to-cyan-950 text-white shadow-2xl shadow-cyan-500/20"
              :style="{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }"
            >
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">CYBERPASS 3.0</span>
                  <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div class="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-3xl shadow-inner shadow-cyan-400/30">
                  💠
                </div>
                <h3 class="text-lg font-extrabold text-white mt-4 tracking-tight">視覺次元通票</h3>
                <p class="text-[11px] text-cyan-200/70 mt-1 leading-relaxed">
                  運用 3D Perspective 與 preserve-3d，打造極致前端立體空間。
                </p>
              </div>

              <div class="pt-4 border-t border-cyan-500/30 flex items-center justify-between text-[11px] text-cyan-300">
                <span class="font-mono">LV.7 ARCHITECT</span>
                <span class="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">點擊翻轉 🔄</span>
              </div>
            </div>

            <!-- BACK FACE -->
            <div
              class="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between border border-purple-500/40 bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 text-white shadow-2xl shadow-purple-500/20"
              :style="{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }"
            >
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold">EASTER EGG</span>
                  <span class="text-xs">🎉</span>
                </div>
                <div class="mt-4 text-center">
                  <div class="text-4xl mb-2">🚀</div>
                  <h4 class="text-base font-extrabold text-white">恭喜解鎖空間次元！</h4>
                  <p class="text-[11px] text-purple-200/80 mt-2 leading-relaxed">
                    透過 backface-visibility: hidden，背面翻過來時正好面向學員，雙面完全無破綻！
                  </p>
                </div>
              </div>

              <div class="pt-4 border-t border-purple-500/30 text-center">
                <span class="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30">
                  再次點擊翻回正面 🔄
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- MISSION 7: Keyframes & Scroll Drivers -->
      <div v-else-if="missionId === 'mission-7'" class="w-full flex flex-col items-center justify-center py-6 space-y-6">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
            <Zap class="h-3.5 w-3.5" />
            實戰場景：反應爐呼吸脈衝光環與閱讀進度指示條
          </div>
        </div>

        <!-- 1. Reading Progress Bar Display -->
        <div class="w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 p-4">
          <div class="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-bold">
            <span>頁面閱讀滾動進度條 (Scroll Progress Indicator)</span>
            <span class="font-mono text-sky-600 dark:text-sky-400">{{ state.scrollProgress }}%</span>
          </div>
          <!-- The Glowing Progress Bar -->
          <div class="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
            <div
              class="h-full rounded-full bg-linear-to-r from-sky-400 via-indigo-500 to-pink-500 shadow-md transition-all duration-300"
              :style="{ width: `${state.scrollProgress}%` }"
            ></div>
          </div>
          <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">
            現代 CSS 支援 animation-timeline: scroll()，無需 JavaScript 監聽即可純代碼實現捲動聯動！
          </div>
        </div>

        <!-- 2. Reactor Pulse Glow Orb -->
        <div class="py-6 flex flex-col items-center">
          <div
            class="relative flex h-32 w-32 items-center justify-center rounded-full bg-slate-950 border border-sky-400/50 transition-all cursor-pointer"
            :style="{
              boxShadow: `0 0 ${state.glowSpread}px ${state.glowColor}, inset 0 0 ${state.glowSpread / 1.5}px ${state.glowColor}`,
              animation: `pulseReactor ${state.animationDuration}s ${state.timingFunction} infinite ${state.animationDirection}`
            }"
          >
            <div class="absolute inset-2 rounded-full border border-dashed border-sky-300/40 animate-spin" style="animation-duration: 10s;"></div>
            <div class="text-3xl">⚛️</div>
          </div>

          <div class="mt-5 text-center">
            <span class="font-mono text-xs text-sky-600 dark:text-sky-300 font-bold bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              animation: pulseReactor {{ state.animationDuration }}s {{ state.timingFunction }} infinite {{ state.animationDirection }};
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes pulseReactor {
  0% {
    transform: scale(0.92);
    filter: brightness(0.9);
  }
  50% {
    transform: scale(1.08);
    filter: brightness(1.25);
  }
  100% {
    transform: scale(0.92);
    filter: brightness(0.9);
  }
}
</style>

