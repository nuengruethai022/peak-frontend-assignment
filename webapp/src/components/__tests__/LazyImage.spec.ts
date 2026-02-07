import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LazyImage from '../LazyImage.vue'

describe('LazyImage', () => {
  it('renders wrapper with correct class', () => {
    const wrapper = mount(LazyImage, {
      props: { src: '/test.jpg', alt: 'Test image' },
    })
    expect(wrapper.find('.lazy-image-wrapper').exists()).toBe(true)
  })

  it('does not render img until in viewport (lazy loading)', () => {
    const wrapper = mount(LazyImage, {
      props: { src: '/test.jpg', alt: 'Test image' },
    })
   
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('passes src and alt props', () => {
    const wrapper = mount(LazyImage, {
      props: { src: 'https://example.com/image.png', alt: 'Example' },
    })
    expect(wrapper.props()).toEqual({ src: 'https://example.com/image.png', alt: 'Example' })
  })
})
