<script setup>
import { ref } from 'vue'
import { X, BookOpenCheck, Copy, Check, Target, Sparkles } from 'lucide-vue-next'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  mission: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const isCopied = ref(false)

function copyTargetCss() {
  navigator.clipboard.writeText(props.mission.designerTargetCss)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- 背景遮罩 -->
    <div @click="emit('close')" class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"></div>

    <!-- 彈窗內容 (更寬敞、排版舒展、無滾動條，一覽無遺) -->
    <div class="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-scale-up">
      <!-- 關閉按鈕 -->
      <button
        @click="emit('close')"
        class="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- 標題 -->
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
          <BookOpenCheck class="w-5 h-5" />
        </div>
        <div>
          <h3 class="text-base font-black text-slate-900 dark:text-white">
            設計師 Target 樣板祕笈（參考標準）
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ mission.title }} 的現代 UI 黃金規格剖析
          </p>
        </div>
      </div>

      <!-- 內容區 (寬版平鋪，徹底移除滾動條，一覽無遺) -->
      <div class="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
        <!-- 設計標準清單 (3 欄平鋪整齊呈現，一眼了然) -->
        <div v-if="mission.targetInspector?.metrics" class="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/80 space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
            <div class="flex items-center gap-1.5">
              <Target class="w-4 h-4" />
              <span>現代 UI 黃金規格關鍵指標：</span>
            </div>
            <span v-if="mission.targetInspector.tip" class="text-[11px] font-normal text-purple-600/90 dark:text-purple-400/90 hidden sm:inline">{{ mission.targetInspector.tip }}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            <div
              v-for="(item, key) in mission.targetInspector.metrics"
              :key="key"
              class="flex items-center justify-between p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50"
            >
              <span class="text-slate-700 dark:text-slate-300 font-medium">{{ item.label }}</span>
              <span class="text-purple-600 dark:text-purple-400 font-bold text-[11px] font-mono">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- 設計師標準 CSS 程式碼 (自動換行，無水平滾動條) -->
        <div class="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 p-4 font-mono text-xs no-scrollbar space-y-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
            <span>設計師驗證通過之完成品 CSS</span>
            <button
              @click="copyTargetCss"
              class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Check v-if="isCopied" class="w-3.5 h-3.5 text-emerald-400" />
              <Copy v-else class="w-3.5 h-3.5" />
              <span>{{ isCopied ? '已複製' : '複製祕笈' }}</span>
            </button>
          </div>
          <pre class="text-purple-300 leading-relaxed whitespace-pre-wrap select-text">{{ mission.designerTargetCss }}</pre>
        </div>
      </div>

      <!-- 底部按鈕 -->
      <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
        <button
          @click="emit('close')"
          class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
        >
          我了解了，回到任務練習
        </button>
      </div>
    </div>
  </div>
</template>
