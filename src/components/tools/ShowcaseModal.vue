<script setup>
import { X, ExternalLink, Sparkles, Award } from 'lucide-vue-next'
import { SHOWCASES } from '../../data/showcase.js'

const props = defineProps({
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
    <div class="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 p-6 shadow-2xl max-h-[90vh] overflow-y-auto transition-colors duration-200">
      
      <!-- Close Button -->
      <button @click="emit('close')" class="absolute top-4 right-4 rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white">
        <X class="h-5 w-5" />
      </button>

      <!-- Header -->
      <div class="flex items-center gap-2 mb-2">
        <Sparkles class="h-6 w-6 text-amber-500 dark:text-amber-400" />
        <h2 class="text-lg font-extrabold text-slate-900 dark:text-white">神級純 CSS 作品賞析：代碼工藝極限</h2>
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-6">不使用一張圖片、不寫半行 JavaScript！純粹以 CSS 雕琢出光影、硬體工業設計與遊戲敘事。</p>

      <!-- Showcase Cards Grid -->
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="item in SHOWCASES"
          :key="item.id"
          class="rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 p-4 flex flex-col justify-between shadow-2xs"
        >
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="rounded bg-amber-500/15 dark:bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                {{ item.badge }}
              </span>
              <span class="text-xs text-slate-500">{{ item.author }}</span>
            </div>

            <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{{ item.title }}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{{ item.description }}</p>

            <!-- Key Techniques -->
            <div class="space-y-1.5 border-t border-slate-200 dark:border-slate-800/80 pt-2.5">
              <div class="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">核心技術解密：</div>
              <ul class="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                <li v-for="(t, idx) in item.techniques" :key="idx" class="flex items-start gap-1.5">
                  <span class="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span>{{ t }}</span>
                </li>
              </ul>
            </div>
          </div>

          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 py-2 text-xs font-bold text-slate-800 dark:text-white hover:border-purple-500 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all shadow-xs"
          >
            <span>觀摩原始源碼 (CodePen / 網站)</span>
            <ExternalLink class="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

    </div>
  </div>
</template>
