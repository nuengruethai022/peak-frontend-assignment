import { ref } from 'vue'

export type ToastType = 'success' | 'info' | 'error'

export interface Toast {
  id: number
  message: string
  type: ToastType
}

const toasts = ref<Toast[]>([])
let id = 0
const timers = new Map<number, ReturnType<typeof setTimeout>>()
const DEFAULT_DURATION = 3000

export function useToast() {
  function dismissToast(toastId: number) {
    const t = timers.get(toastId)
    if (t) {
      clearTimeout(t)
      timers.delete(toastId)
    }
    toasts.value = toasts.value.filter((t) => t.id !== toastId)
  }

  function showToast(message: string, type: ToastType = 'info', duration = DEFAULT_DURATION) {
    const toastId = ++id
    toasts.value = [...toasts.value, { id: toastId, message, type }]

    const timer = setTimeout(() => {
      dismissToast(toastId)
      timers.delete(toastId)
    }, duration)
    timers.set(toastId, timer)
  }

  return { toasts, showToast, dismissToast }
}
