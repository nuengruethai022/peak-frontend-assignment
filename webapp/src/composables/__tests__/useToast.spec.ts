import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useToast } from '../useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Reset shared state - dismiss all existing toasts
    const { toasts, dismissToast } = useToast()
    const ids = toasts.value.map((t) => t.id)
    ids.forEach((id) => dismissToast(id))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with empty toasts', () => {
    const { toasts } = useToast()
    expect(toasts.value).toEqual([])
  })

  it('showToast adds a toast', () => {
    const { toasts, showToast } = useToast()

    showToast('Test message', 'info')

    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].message).toBe('Test message')
    expect(toasts.value[0].type).toBe('info')
  })

  it('showToast supports success and error types', () => {
    const { toasts, showToast } = useToast()

    showToast('Success', 'success')
    expect(toasts.value[0].type).toBe('success')

    showToast('Error', 'error')
    expect(toasts.value[1].type).toBe('error')
  })

  it('dismissToast removes toast by id', () => {
    const { toasts, showToast, dismissToast } = useToast()

    showToast('First')
    showToast('Second')
    const idToRemove = toasts.value[0].id

    dismissToast(idToRemove)

    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].message).toBe('Second')
  })

  it('auto-dismisses toast after default duration', () => {
    const { toasts, showToast } = useToast()

    showToast('Auto dismiss')

    expect(toasts.value).toHaveLength(1)

    vi.advanceTimersByTime(3000)

    expect(toasts.value).toHaveLength(0)
  })

  it('can show multiple toasts', () => {
    const { toasts, showToast } = useToast()

    showToast('First')
    showToast('Second')
    showToast('Third')

    expect(toasts.value).toHaveLength(3)
  })
})
