<script setup>
import { ref, computed } from 'vue'
import { Code2, Copy, Check } from 'lucide-vue-next'

const props = defineProps({
  missionId: { type: String, required: true },
  state: { type: Object, required: true }
})

const activeTab = ref('css') // 'css' | 'tailwind'
const isCopied = ref(false)

// 產生乾淨格式化的 CSS
const generatedCss = computed(() => {
  if (props.missionId === 'mission-1') {
    return `/* 海報卡片容器 */
.poster-card {
  box-sizing: ${props.state.boxSizing};
  width: ${props.state.contentWidth}px;
  padding: ${props.state.padding}px;
  border: ${props.state.borderWidth}px solid #f43f5e;
  border-radius: 12px;
  background: #1e293b;
}

/* 標題選擇器優先級 (Specificity) */
${props.state.selectorType === 'tag' ? 'h2' : props.state.selectorType === 'class' ? '.poster-title' : '#vip-title'} {
  font-size: ${props.state.fontSizeRem}rem;
  color: ${props.state.selectorType === 'tag' ? '#64748b' : props.state.selectorType === 'class' ? '#ec4899' : '#38bdf8'};
  font-weight: 700;
}`
  } else if (props.missionId === 'mission-2') {
    return `/* 炫彩流光按鈕 */
.magic-button {
  background: linear-gradient(${props.state.gradientAngle}deg, ${props.state.colorFrom}, ${props.state.colorTo});
  border-radius: ${props.state.borderRadius}px;
  box-shadow: 0 ${props.state.shadowY}px ${props.state.shadowBlur}px rgba(99, 102, 241, 0.4);
  transition: all ${props.state.transitionDuration}s ease-in-out;
}

.magic-button:hover {
  transform: translateY(${props.state.hoverTranslateY}px);
  box-shadow: 0 ${props.state.shadowY + 6}px ${props.state.shadowBlur + 10}px rgba(99, 102, 241, 0.6);
}

/* 純 CSS @keyframes Spinner */
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: ${props.state.spinnerColor};
  border-radius: 50%;
  animation: spin ${props.state.spinnerSpeed}s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`
  } else if (props.missionId === 'mission-3') {
    if (props.state.layoutEngine === 'grid') {
      return `/* 1. CSS Grid 現代自適應容器 */
.product-grid {
  display: ${props.state.display};
  grid-template-columns: ${props.state.gridAutoFit ? 'repeat(auto-fit, minmax(200px, 1fr))' : 'repeat(4, 1fr)'};
  gap: ${props.state.gap}px;
}

/* 2. 商品卡片與流體動態字級 */
.product-card h4 {
  ${props.state.fluidTypography ? 'font-size: clamp(0.875rem, 1.8vw, 1.25rem); /* clamp(MIN, VAL, MAX) */' : 'font-size: 13px; /* 固定字級 */'}
}`
    }

    return `/* 1. 父容器彈性排版 */
.card-grid {
  display: ${props.state.display};
  flex-direction: ${props.state.flexDirection || 'row'};
  flex-wrap: ${props.state.flexWrap};
  justify-content: ${props.state.justifyContent};
  gap: ${props.state.gap}px;
}

/* 2. 行動優先 (Mobile-First) 預設手機單欄 (100%) */
.card-item {
  flex: 1 1 100%;
  ${props.state.fluidTypography ? 'font-size: clamp(0.875rem, 1.8vw, 1.25rem);' : 'font-size: 13px;'}
}

/* 3. 平板斷點（自動切換為雙欄 50%） */
@media (min-width: 768px) {
  .card-item {
    flex: 1 1 calc(50% - ${props.state.gap}px);
  }
}

/* 4. 桌機斷點（自動展開為四欄 25%） */
@media (min-width: 1024px) {
  .card-item {
    flex: 1 1 calc(25% - ${props.state.gap}px);
  }
}`
  } else if (props.missionId === 'mission-4') {
    return `/* Tailwind 4 Utility Classes 組合成果 */
<div class="${props.state.selectedClasses.join(' ')}">
  <h3 class="font-bold text-white">AI 現代元件</h3>
  <p class="text-sm text-slate-300">零配置、無全域污染、GPU 加速</p>
</div>`
  } else if (props.missionId === 'mission-5') {
    return `/* 1. 父容器相對定位（建立座標錨點） */
.card-wrapper {
  position: ${props.state.parentPosition};
}

/* 2. 未讀紅點絕對定位（子絕父相） */
.notification-badge {
  position: ${props.state.badgePosition};
  top: ${props.state.badgePosition === 'absolute' ? `${props.state.badgeTop}px` : 'auto'};
  right: ${props.state.badgePosition === 'absolute' ? `${props.state.badgeRight}px` : 'auto'};
  z-index: ${props.state.badgeZIndex};
}

/* 3. 分類標籤導航列吸頂 */
.category-nav {
  position: ${props.state.stickyEnabled ? 'sticky' : 'static'};
  top: 0;
  z-index: 20;
}`
  } else if (props.missionId === 'mission-6') {
    return `/* 1. 外層 3D 透視深度 */
.stage-container {
  perspective: ${props.state.perspective ? `${props.state.perspective}px` : 'none'};
}

/* 2. 3D 卡片主體（維持空間立體感） */
.flip-card {
  transform-style: ${props.state.preserve3d ? 'preserve-3d' : 'flat'};
  transform: rotateX(${props.state.rotateX}deg) rotateY(${props.state.rotateY + (props.state.isFlipped ? 180 : 0)}deg) translateZ(${props.state.translateZ}px);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 3. 正反面背面隱藏 (Card Flip) */
.card-face {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}`
  } else if (props.missionId === 'mission-7') {
    return `/* 1. 頁面滾動進度條 */
.scroll-indicator {
  width: ${props.state.scrollProgress}%;
  height: 8px;
  background: linear-gradient(90deg, #38bdf8, #6366f1, #ec4899);
  transition: width 0.2s ease-out;
}

/* 2. 核心反應爐呼吸脈衝 */
.reactor-core {
  box-shadow: 0 0 ${props.state.glowSpread}px ${props.state.glowColor},
              inset 0 0 ${Math.round(props.state.glowSpread / 1.5)}px ${props.state.glowColor};
  animation: pulseReactor ${props.state.animationDuration}s ${props.state.timingFunction} infinite ${props.state.animationDirection};
}

@keyframes pulseReactor {
  0%, 100% { transform: scale(0.92); filter: brightness(0.9); }
  50% { transform: scale(1.08); filter: brightness(1.25); }
}`
  } else {
    return '/* 查無對應 CSS */'
  }
})

// 產生 Tailwind 對照 Class
const tailwindEquivalent = computed(() => {
  if (props.missionId === 'mission-1') {
    const box = props.state.boxSizing === 'border-box' ? 'box-border' : 'box-content'
    return `<!-- Tailwind 對應寫法 -->
<div class="${box} w-70 p-[${props.state.padding}px] border-[${props.state.borderWidth}px] border-rose-500 rounded-xl bg-slate-850">
  <h2 class="text-xl font-bold text-pink-500">資訊社海報</h2>
</div>`
  } else if (props.missionId === 'mission-2') {
    return `<!-- Tailwind 對應按鈕與動畫 -->
<button class="bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[${props.state.borderRadius}px] shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out">
  <span class="animate-spin inline-block mr-2">⟳</span> 立即報名
</button>`
  } else if (props.missionId === 'mission-3') {
    if (props.state.layoutEngine === 'grid') {
      return `<!-- Tailwind 4 現代 CSS Grid 自適應寫法 -->
<div class="${props.state.display === 'block' ? 'block' : 'grid'} ${props.state.gridAutoFit ? 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]' : 'grid-cols-4'} gap-[${props.state.gap}px]">
  <div class="bg-slate-800 p-4 rounded-xl ${props.state.fluidTypography ? 'text-[clamp(0.875rem,1.8vw,1.25rem)]' : 'text-xs'}">
    智慧自適應卡片 (免手寫斷點)
  </div>
</div>`
    }
    return `<!-- Tailwind 4 行動優先 (Mobile-First) 斷點階梯 -->
<div class="${props.state.display} ${props.state.flexWrap} gap-[${props.state.gap}px] justify-${props.state.justifyContent}">
  <div class="w-full md:w-1/2 lg:w-1/4 bg-slate-800 p-4 rounded-xl ${props.state.fluidTypography ? 'text-[clamp(0.875rem,1.8vw,1.25rem)]' : 'text-xs'}">
    商品卡片 (手機單欄 / md 雙欄 / lg 四欄)
  </div>
</div>`
  } else if (props.missionId === 'mission-4') {
    return props.state.selectedClasses.join(' ')
  } else if (props.missionId === 'mission-5') {
    return `<!-- Tailwind 4 定位寫法 -->
<div class="${props.state.parentPosition}">
  <span class="${props.state.badgePosition} top-[${props.state.badgeTop}px] right-[${props.state.badgeRight}px] z-[${props.state.badgeZIndex}] bg-rose-500 text-white rounded-full">
    9+
  </span>
  <nav class="${props.state.stickyEnabled ? 'sticky top-0 z-20' : 'static'}">
    分類導航
  </nav>
</div>`
  } else if (props.missionId === 'mission-6') {
    return `<!-- Tailwind 4 3D 空間與翻轉卡片 -->
<div class="[perspective:${props.state.perspective}px]">
  <div class="relative w-64 h-80 transition-transform duration-500 [transform-style:${props.state.preserve3d ? 'preserve-3d' : 'flat'}]">
    <div class="absolute inset-0 [backface-visibility:hidden]">正面內容</div>
    <div class="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">背面彩蛋</div>
  </div>
</div>`
  } else if (props.missionId === 'mission-7') {
    return `<!-- Tailwind 4 滾動進度條與發光脈衝 -->
<div class="w-[${props.state.scrollProgress}%] h-2 bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500"></div>
<div class="shadow-[0_0_${props.state.glowSpread}px_${props.state.glowColor}] animate-pulse">
  能量核心
</div>`
  } else {
    return ''
  }
})

function copyCode() {
  const code = activeTab.value === 'css' ? generatedCss.value : tailwindEquivalent.value
  navigator.clipboard.writeText(code)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70 p-4 backdrop-blur-md shadow-xs dark:shadow-none transition-colors duration-200">
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
      <div class="flex items-center gap-2">
        <button
          @click="activeTab = 'css'"
          class="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all"
          :class="activeTab === 'css' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
        >
          <Code2 class="h-3.5 w-3.5" />
          實時 CSS 代碼
        </button>
        <button
          @click="activeTab = 'tailwind'"
          class="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all"
          :class="activeTab === 'tailwind' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
        >
          Tailwind 4 對照
        </button>
      </div>

      <button
        @click="copyCode"
        class="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100/90 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white transition-colors shadow-xs"
      >
        <component :is="isCopied ? Check : Copy" class="h-3.5 w-3.5" :class="isCopied ? 'text-emerald-500 dark:text-emerald-400' : ''" />
        <span>{{ isCopied ? '已複製！' : '複製' }}</span>
      </button>
    </div>

    <!-- Code Display Area (Sleek Dark IDE Style with High-Contrast Tokens) -->
    <pre class="overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-purple-200 border border-slate-800/90 shadow-inner max-h-[580px]"><code>{{ activeTab === 'css' ? generatedCss : tailwindEquivalent }}</code></pre>
  </div>
</template>
