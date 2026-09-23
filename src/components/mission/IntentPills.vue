<script setup>
import { 
  Sparkles, 
  CircleDot, 
  Maximize2, 
  Maximize, 
  Palette, 
  Sun, 
  Circle, 
  Type, 
  Scissors, 
  Pin, 
  Moon, 
  Eye, 
  AlignJustify, 
  Edit3, 
  Send, 
  Layers, 
  Tag 
} from 'lucide-vue-next'

const props = defineProps({
  intentPills: { type: Array, required: true },
  appliedPillIds: { type: Array, default: () => [] }
})

const emit = defineEmits(['applyPill'])

// 圖示對照表
const iconMap = {
  CircleDot,
  Maximize2,
  Maximize,
  Palette,
  Sun,
  Circle,
  Type,
  Scissors,
  Pin,
  Moon,
  Eye,
  AlignJustify,
  Edit3,
  Send,
  Layers,
  Tag,
  Sparkles
}

function getIcon(name) {
  return iconMap[name] || Sparkles
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Sparkles class="w-4 h-4 text-purple-500" />
        <h3 class="text-sm font-black text-slate-900 dark:text-white">
          快捷設計意圖膠囊（新手 0 門檻推薦）
        </h3>
      </div>
      <span class="text-xs text-slate-500 dark:text-slate-400">
        點擊即可注入 1~2 個關鍵屬性
      </span>
    </div>

    <!-- 膠囊按鈕網格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
      <button
        v-for="pill in intentPills"
        :key="pill.id"
        @click="emit('applyPill', pill)"
        class="group relative text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between"
        :class="[
          appliedPillIds.includes(pill.id)
            ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700 shadow-xs'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md'
        ]"
      >
        <div class="flex items-start gap-2.5 mb-1.5">
          <div
            class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
            :class="[
              appliedPillIds.includes(pill.id)
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300 group-hover:bg-purple-600 group-hover:text-white'
            ]"
          >
            <component :is="getIcon(pill.icon)" class="w-4 h-4" />
          </div>

          <div class="min-w-0">
            <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {{ pill.category }}
            </span>
            <span class="block text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
              {{ pill.label }}
            </span>
          </div>
        </div>

        <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {{ pill.explanation }}
        </p>

        <!-- 狀態標記 -->
        <span
          v-if="appliedPillIds.includes(pill.id)"
          class="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500"
        ></span>
      </button>
    </div>
  </div>
</template>
