import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ToastContainer from '../ToastContainer.vue'

describe('ToastContainer', () => {
  let wrapper: ReturnType<typeof mount>

  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders empty when no toasts', async () => {
    wrapper = mount(ToastContainer)
    await nextTick()
   
    expect(document.body.querySelector('.toast-list')).toBeTruthy()
    expect(document.body.querySelectorAll('.toast')).toHaveLength(0)
  })

  it('has proper accessibility attributes', async () => {
    wrapper = mount(ToastContainer)
    await nextTick()
    const container = document.body.querySelector('.toast-container')
    expect(container?.getAttribute('aria-live')).toBe('polite')
  })
})
