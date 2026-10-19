import { watch, onUnmounted } from 'vue'

// 彈窗共用行為：開啟時鎖定背景捲動、按 Esc 關閉
export function useModalBehavior(isOpen, onClose) {
  function handleKeydown(e) {
    if (e.key === 'Escape') onClose()
  }

  function setOpen(open) {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      window.addEventListener('keydown', handleKeydown)
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  }

  watch(isOpen, setOpen, { immediate: true })

  onUnmounted(() => setOpen(false))
}
