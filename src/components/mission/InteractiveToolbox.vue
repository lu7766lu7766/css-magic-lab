<script setup>
import { ref, computed } from 'vue'
import { 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Target,
  Code2
} from 'lucide-vue-next'

const props = defineProps({
  tools: { type: Array, required: true },
  toolStates: { type: Object, required: true }, // { [toolId]: { enabled: boolean, value: any } }
  targetColors: { type: Array, default: () => [] }
})

const emit = defineEmits(['toggleTool', 'updateValue', 'pickColor'])

// 當前展開進行數值精細微調的工具 ID
const expandedToolId = ref(null)

// 計算當前已啟用的工具數量
const enabledCount = computed(() => {
  return Object.values(props.toolStates).filter(s => s?.enabled).length
})

function handlePillClick(tool) {
  const current = props.toolStates[tool.id] || { enabled: false, value: tool.defaultValue }
  const newEnabled = !current.enabled
  
  // 遵循使用者明確指示：打開時預設為乾淨的值 (cleanValue)，絕不自動代入設計師目標值！
  // 再次點擊還原為預設狀態 (defaultValue)
  emit('toggleTool', {
    toolId: tool.id,
    enabled: newEnabled,
    value: newEnabled ? (tool.cleanValue !== undefined ? tool.cleanValue : tool.defaultValue) : tool.defaultValue
  })

  if (newEnabled) {
    expandedToolId.value = tool.id
  } else if (expandedToolId.value === tool.id) {
    expandedToolId.value = null
  }
}

function handleValueChange(toolId, val) {
  emit('updateValue', { toolId, value: val })
}

function applyEyedropper(toolId, hex) {
  emit('updateValue', { toolId, value: hex })
  emit('pickColor', hex)
}
</script>

<template>
  <div class="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
    <!-- 頂部標題與玩法說明 -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold">
          <Sliders class="w-4 h-4" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-black text-slate-900 dark:text-white">
              十五項視覺調校工具箱
            </h3>
            <span
              class="text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-colors"
              :class="[
                enabledCount >= 9 && enabledCount <= 11
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
              ]"
            >
              已啟用 {{ enabledCount }} / 15 項（目標需要約 10 項）
            </span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            🎯 點一下開啟控制項（從乾淨預設值起步），再次點擊可關閉還原；請對照設計師目標成品，挑選真正需要的關鍵屬性！
          </p>
        </div>
      </div>
    </div>

    <!-- 十五項工具網格列表 (響應式排版) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
      <div
        v-for="tool in tools"
        :key="tool.id"
        class="rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between"
        :class="[
          toolStates[tool.id]?.enabled
            ? 'bg-purple-50/90 dark:bg-purple-950/40 border-purple-400 dark:border-purple-600 shadow-xs ring-1 ring-purple-400/30'
            : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        ]"
      >
        <!-- 工具按鈕頭部（點一下開啟乾淨值，再點一下還原） -->
        <button
          type="button"
          @click="handlePillClick(tool)"
          class="w-full p-2.5 text-left flex items-start justify-between gap-1.5 transition-colors cursor-pointer select-none"
        >
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 mb-1">
              <span
                class="w-2 h-2 rounded-full shrink-0"
                :class="toolStates[tool.id]?.enabled ? 'bg-purple-600 dark:bg-purple-400 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'"
              ></span>
              <span class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                {{ tool.name }}
              </span>
            </div>

            <!-- 改動的 CSS 屬性識別標籤 -->
            <div class="flex items-center gap-1 mb-1">
              <span
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold transition-colors border"
                :class="[
                  toolStates[tool.id]?.enabled
                    ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300/60 dark:border-slate-700'
                ]"
              >
                <Code2 class="w-2.5 h-2.5 shrink-0 opacity-70" />
                <span class="truncate">{{ tool.cssProperty }}</span>
              </span>
            </div>

            <p class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
              {{ tool.desc }}
            </p>
          </div>

          <!-- 開啟/還原狀態徽章 -->
          <span
            class="text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 transition-colors"
            :class="[
              toolStates[tool.id]?.enabled
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            ]"
          >
            {{ toolStates[tool.id]?.enabled ? 'ON' : 'OFF' }}
          </span>
        </button>

        <!-- 啟用狀態下的微調控制介面 (由使用者自行拖曳或選色) -->
        <div
          v-if="toolStates[tool.id]?.enabled"
          class="px-2.5 pb-2.5 pt-1.5 border-t border-purple-200/60 dark:border-purple-800/60 bg-white/70 dark:bg-slate-900/70 space-y-2 animate-fade-in text-xs"
        >
          <!-- 1. 滑桿控制 (Slider) -->
          <div v-if="tool.type === 'slider'" class="space-y-1">
            <div class="flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <span>手動調校:</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">
                {{ toolStates[tool.id].value }}{{ tool.unit }}
              </span>
            </div>
            <input
              type="range"
              :min="tool.min"
              :max="tool.max"
              :step="tool.step || 1"
              :value="toolStates[tool.id].value >= 9999 ? tool.max : toolStates[tool.id].value"
              @input="handleValueChange(tool.id, Number($event.target.value))"
              class="w-full accent-purple-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <!-- 膠囊快捷切換 -->
            <button
              v-if="tool.hasCapsuleToggle"
              type="button"
              @click="handleValueChange(tool.id, toolStates[tool.id].value >= 9999 ? 16 : 9999)"
              class="w-full py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer"
              :class="toolStates[tool.id].value >= 9999 ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'"
            >
              {{ toolStates[tool.id].value >= 9999 ? '已鎖定 9999px 膠囊' : '切換為 9999px 膠囊' }}
            </button>
          </div>

          <!-- 2. 色彩選擇 (Color Picker) -->
          <div v-else-if="tool.type === 'color'" class="space-y-1.5">
            <div class="flex items-center gap-2">
              <input
                type="color"
                :value="toolStates[tool.id].value"
                @input="handleValueChange(tool.id, $event.target.value)"
                class="w-7 h-7 rounded border border-slate-300 dark:border-slate-700 cursor-pointer p-0 shrink-0"
              />
              <input
                type="text"
                :value="toolStates[tool.id].value"
                @change="handleValueChange(tool.id, $event.target.value)"
                class="flex-1 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-[11px] text-slate-700 dark:text-slate-300 focus:outline-none"
                placeholder="#xxxxxx"
              />
            </div>
            <!-- 目標顏色快捷色票 -->
            <div v-if="targetColors.length > 0" class="flex items-center gap-1 pt-0.5">
              <span class="text-[9px] text-slate-400">色票:</span>
              <button
                v-for="tc in targetColors.slice(0, 4)"
                :key="tc.hex"
                type="button"
                @click="applyEyedropper(tool.id, tc.hex)"
                class="w-3.5 h-3.5 rounded border border-slate-300 dark:border-slate-600 hover:scale-125 transition-transform"
                :style="{ background: tc.hex }"
                :title="`帶入 ${tc.label} (${tc.hex})`"
              ></button>
            </div>
          </div>

          <!-- 3. 下拉/選項按鈕 (Select) -->
          <div v-else-if="tool.type === 'select'" class="flex items-center gap-1">
            <button
              v-for="opt in tool.options"
              :key="opt.value"
              type="button"
              @click="handleValueChange(tool.id, opt.value)"
              class="flex-1 py-1 rounded text-[10px] font-bold border transition-colors truncate text-center cursor-pointer"
              :class="toolStates[tool.id].value === opt.value ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'"
            >
              {{ opt.label }}
            </button>
          </div>

          <!-- 4. 單純開關 (Toggle) -->
          <div v-else-if="tool.type === 'toggle'" class="text-[11px] text-purple-600 dark:text-purple-400 font-semibold flex items-center justify-between">
            <div class="flex items-center gap-1">
              <Check class="w-3.5 h-3.5" />
              <span>屬性已啟用</span>
            </div>
            <span class="text-[10px] text-slate-400">再次點擊關閉</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
