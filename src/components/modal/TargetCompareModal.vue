<script setup>
import { ref, computed } from 'vue'
import { X, BookOpenCheck, Copy, Check, Sparkles, Code2 } from 'lucide-vue-next'
import { scopeCss } from '../../data/cssGenerators.js'

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

// 樣式作用域隔離：確保彈窗內的設計師預覽樣式不外溢
// 附加響應式防溢出：CTA 按鈕組在窄螢幕自動換行，避免任何水平捲軸
const scopedTargetCss = computed(() => {
  if (!props.mission?.designerTargetCss) return ''
  return scopeCss(props.mission.designerTargetCss, 'target-modal-canvas')
    + '\n.target-modal-canvas .cta-group { flex-wrap: wrap; }'
})

// 自動檢查元件尺寸：解析目標 CSS 中的固定寬度，若超過半欄可容納寬度 (~470px)
// 則預覽改為整列全寬呈現，維持 1:1 原尺寸且不出現捲軸
const needsFullWidth = computed(() => {
  const css = props.mission?.designerTargetCss || ''
  const matches = [...css.matchAll(/(?:max-)?width:\s*(\d+)px/g)]
  const maxW = matches.reduce((m, cur) => Math.max(m, parseInt(cur[1], 10)), 0)
  return maxW >= 480
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
    <!-- 背景遮罩 -->
    <div @click="emit('close')" class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"></div>

    <!-- 彈窗內容：更寬敞大氣 (max-w-5xl)、排版舒展、雙欄視覺對照、完整呈現設計師樣式全貌 -->
    <div class="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-scale-up">
      <!-- 關閉按鈕 -->
      <button
        @click="emit('close')"
        class="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer z-10"
        title="關閉彈窗"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- 標題 -->
      <div class="flex items-center gap-3 mb-4 shrink-0 pr-10">
        <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
          <BookOpenCheck class="w-5 h-5" />
        </div>
        <div>
          <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>設計師 Target 樣板祕笈（參考標準）</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hidden sm:inline">
              100分滿分標準
            </span>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ mission.title }} 的現代 UI 黃金規格剖析與真實預覽全貌
          </p>
        </div>
      </div>

      <!-- 內容區 (支援平滑滾動，雙欄並排，視覺成果與代碼一覽無遺) -->
      <div class="flex-1 overflow-y-auto space-y-4 pr-1 selection:bg-purple-500 selection:text-white">
        <!-- 核心並排區域：左欄真實視覺預覽 + 關鍵指標，右欄驗證通過 CSS 代碼 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          <!-- ==================== 左欄：設計師完成品真實視覺預覽 + 規格指標 ==================== -->
          <!-- 寬版元件（如第五關 580px Hero）自動改為整列全寬，維持 1:1 原尺寸 -->
          <div class="flex flex-col gap-3 min-w-0" :class="needsFullWidth ? 'lg:col-span-12' : 'lg:col-span-6'">
            <!-- 🎨 設計師成果視覺預覽畫布 -->
            <div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs flex flex-col">
              <!-- 預覽標題列 -->
              <div class="px-3.5 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                <div class="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <Sparkles class="w-4 h-4" />
                  <span>🎯 完成品真實視覺預覽</span>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  設計師成果全貌
                </span>
              </div>

              <!-- 注入設計師 Target CSS (使用 target-modal-canvas 命名空間隔離) -->
              <component :is="'style'">
                {{ scopedTargetCss }}
              </component>

              <!-- 預覽畫布 (1:1 原尺寸渲染，高度自動撐開貼合元件，永不出現捲軸) -->
              <div
                class="min-h-[200px] sm:min-h-[240px] p-4 sm:p-6 flex bg-slate-100/70 dark:bg-slate-950/70 relative overflow-hidden"
                style="background-image: radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px); background-size: 16px 16px;"
              >
                <div class="target-modal-canvas w-full flex justify-center m-auto min-w-0">
                  <div class="min-w-0 max-w-full" v-html="mission.htmlTemplate"></div>
                </div>
              </div>

              <!-- 畫布底端提示 -->
              <div class="px-3 py-1.5 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between shrink-0">
                <span>💡 完整展示留白、層次、陰影與元件全貌</span>
                <span class="text-purple-500 font-semibold">100分滿分標準</span>
              </div>
            </div>

          </div>

          <!-- ==================== 右欄：設計師驗證通過之完成品 CSS ==================== -->
          <div class="flex flex-col rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-xs min-h-[380px] min-w-0" :class="needsFullWidth ? 'lg:col-span-12' : 'lg:col-span-6'">
            <!-- 程式碼標題與複製按鈕 -->
            <div class="px-3.5 py-2.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0">
              <div class="flex items-center gap-1.5 text-xs font-bold text-slate-200 font-sans">
                <Code2 class="w-4 h-4 text-purple-400" />
                <span>設計師驗證通過之完成品 CSS</span>
              </div>
              <button
                @click="copyTargetCss"
                class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-sans text-xs cursor-pointer border border-slate-800"
              >
                <Check v-if="isCopied" class="w-3.5 h-3.5 text-emerald-400" />
                <Copy v-else class="w-3.5 h-3.5" />
                <span>{{ isCopied ? '已複製' : '複製祕笈' }}</span>
              </button>
            </div>

            <!-- CSS 程式碼內容區 (具備平滑滾動，文字自動換行，絕不切除) -->
            <div class="flex-1 p-3.5 overflow-y-auto max-h-[460px] sm:max-h-[500px]">
              <pre class="text-purple-300 font-mono text-xs leading-relaxed whitespace-pre-wrap select-text">{{ mission.designerTargetCss }}</pre>
            </div>

            <!-- 代碼底部提示 -->
            <div class="px-3.5 py-1.5 bg-slate-900/80 border-t border-slate-800 text-[10px] font-sans text-slate-400 flex items-center justify-between shrink-0">
              <span>💡 可點選右上角「複製祕笈」對照學習</span>
              <span class="text-emerald-400 font-semibold">完整 100 分代碼</span>
            </div>
          </div>

        </div>
      </div>

      <!-- 底部操作列 -->
      <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <span class="text-xs text-slate-400 hidden sm:inline">可直接對照左側視覺成果與右側 CSS，回到主工作台調整工具箱</span>
        <button
          @click="emit('close')"
          class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity ml-auto cursor-pointer"
        >
          我了解了，回到任務練習
        </button>
      </div>
    </div>
  </div>
</template>
