<script setup>
import { ref } from 'vue'
import { X, Sparkles, Copy, Check, Terminal, ExternalLink } from 'lucide-vue-next'
import { AI_PROMPT_TEMPLATES } from '../../data/aiPrompts.js'

const props = defineProps({
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])

const copiedId = ref(null)
const activeTab = ref('prompts') // 'prompts' | 'dictionary' | 'v4'

function copyPrompt(item) {
  navigator.clipboard.writeText(item.prompt)
  copiedId.value = item.id
  setTimeout(() => {
    copiedId.value = null
  }, 2000)
}

const tailwindDictionary = [
  { css: 'display: flex;', tw: 'flex', desc: '啟動彈性排版' },
  { css: 'flex-direction: column;', tw: 'flex-col', desc: '垂直方向主軸' },
  { css: 'justify-content: center;', tw: 'justify-center', desc: '主軸水平置中' },
  { css: 'align-items: center;', tw: 'items-center', desc: '交叉軸垂直置中' },
  { css: 'gap: 16px;', tw: 'gap-4', desc: '16px 等距留白' },
  { css: 'padding: 24px;', tw: 'p-6', desc: '全方向 24px 內距' },
  { css: 'border-radius: 12px;', tw: 'rounded-xl', desc: '現代圓弧倒角' },
  { css: 'box-shadow: 0 10px 15px...;', tw: 'shadow-lg', desc: '立體浮空陰影' },
  { css: 'transition: all 0.3s;', tw: 'transition duration-300', desc: '平滑動態轉場' },
  { css: '@media (min-width: 768px)', tw: 'md:w-1/2', desc: '平板/桌面以上切換為雙欄' }
]
</script>

<template>
  <!-- Backdrop -->
  <div
    v-if="isOpen"
    @click="emit('close')"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
  ></div>

  <!-- Slide-out Drawer -->
  <div
    class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-y-auto transition-transform duration-300"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-5">
      <div class="flex items-center gap-2">
        <Sparkles class="h-5 w-5 text-purple-600 dark:text-purple-400" />
        <h2 class="text-base font-bold text-slate-900 dark:text-white">Tailwind 4 & AI 工作流抽屜</h2>
      </div>
      <button @click="emit('close')" class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-white transition-colors">
        <X class="h-4 w-4" />
      </button>
    </div>

    <!-- Tabs -->
    <div class="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 p-1 border border-slate-200 dark:border-slate-800 mb-5 text-xs font-semibold">
      <button
        @click="activeTab = 'prompts'"
        class="rounded-lg py-1.5 transition-all text-center"
        :class="activeTab === 'prompts' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
      >
        AI 提示詞庫
      </button>
      <button
        @click="activeTab = 'dictionary'"
        class="rounded-lg py-1.5 transition-all text-center"
        :class="activeTab === 'dictionary' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
      >
        CSS ⇄ TW 對照
      </button>
      <button
        @click="activeTab = 'v4'"
        class="rounded-lg py-1.5 transition-all text-center"
        :class="activeTab === 'v4' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
      >
        Tailwind 4 亮點
      </button>
    </div>

    <!-- TAB 1: AI PROMPTS -->
    <div v-if="activeTab === 'prompts'" class="space-y-4">
      <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        向 AI 提問的黃金心法：指名 Tailwind CSS、要求 GPU 加速屬性 (transform / opacity)，可直接點擊複製範本！
      </p>

      <div
        v-for="item in AI_PROMPT_TEMPLATES"
        :key="item.id"
        class="rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 p-4 space-y-2.5 shadow-2xs"
      >
        <div class="flex items-center justify-between">
          <span class="rounded bg-purple-500/15 dark:bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300">
            {{ item.category }}
          </span>
          <button
            @click="copyPrompt(item)"
            class="flex items-center gap-1 rounded-md bg-purple-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-500 transition-all shadow-xs"
          >
            <component :is="copiedId === item.id ? Check : Copy" class="h-3 w-3" />
            <span>{{ copiedId === item.id ? '已複製！' : '複製 Prompt' }}</span>
          </button>
        </div>

        <h3 class="text-xs font-bold text-slate-900 dark:text-white">{{ item.title }}</h3>
        <p class="text-[11px] text-slate-500 dark:text-slate-400">{{ item.description }}</p>

        <pre class="rounded-lg bg-slate-900 text-slate-200 dark:bg-slate-950 p-2.5 font-mono text-[10px] whitespace-pre-wrap leading-relaxed border border-slate-800/80 max-h-36 overflow-y-auto">{{ item.prompt }}</pre>
      </div>
    </div>

    <!-- TAB 2: TW DICTIONARY -->
    <div v-else-if="activeTab === 'dictionary'" class="space-y-3 text-xs">
      <p class="text-slate-500 dark:text-slate-400 text-xs">常用純 CSS 與 Tailwind 4 Utility Class 快速對照表：</p>
      
      <div class="space-y-2">
        <div
          v-for="(row, idx) in tailwindDictionary"
          :key="idx"
          class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 p-2.5 shadow-2xs"
        >
          <div>
            <div class="font-mono text-[11px] text-slate-700 dark:text-slate-400">{{ row.css }}</div>
            <div class="text-[10px] text-slate-500 mt-0.5">{{ row.desc }}</div>
          </div>
          <div class="rounded-md bg-indigo-500/15 dark:bg-indigo-500/20 px-2 py-1 font-mono text-xs font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
            {{ row.tw }}
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: TAILWIND 4 HIGHLIGHTS -->
    <div v-else-if="activeTab === 'v4'" class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
      <div class="rounded-xl border border-purple-300 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20 p-4">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-1">🚀 1. 全 Rust 編寫 Oxide 引擎</h3>
        <p class="text-slate-600 dark:text-slate-300 text-xs">編譯速度暴增 10 倍以上！程式碼即時存檔即可看見瀏覽器更新，教學毫無等待延遲。</p>
      </div>

      <div class="rounded-xl border border-indigo-300 dark:border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-950/20 p-4">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-1">✨ 2. 零設定檔啟動 (Zero-Config)</h3>
        <p class="text-slate-600 dark:text-slate-300 text-xs">不再需要龐大的 tailwind.config.js！CSS 頂端寫一行 @import "tailwindcss" 即可開箱即用。</p>
      </div>

      <div class="rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 p-4">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-1">📦 3. 原生 CSS 變數支援</h3>
        <p class="text-slate-600 dark:text-slate-300 text-xs">所有色票與主題全部映射為瀏覽器標準 CSS Custom Properties (var(--color-*))，效能絕佳。</p>
      </div>
    </div>
  </div>
</template>
