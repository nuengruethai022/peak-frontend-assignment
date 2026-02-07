import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cart'

describe('useCartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('starts with empty items', () => {
    const store = useCartStore()
    expect(store.items).toEqual([])
    expect(store.itemCount).toBe(0)
    expect(store.totalAmount).toBe(0)
  })

  it('addItem adds a new product', () => {
    const store = useCartStore()
    store.addItem(1, 'Product A', 100, '/photo.jpg', 2)

    expect(store.items).toHaveLength(1)
    expect(store.items[0]).toEqual({
      productId: 1,
      title: 'Product A',
      price: 100,
      photo: '/photo.jpg',
      quantity: 2,
    })
    expect(store.itemCount).toBe(2)
    expect(store.totalAmount).toBe(200)
  })

  it('addItem increases quantity for existing product', () => {
    const store = useCartStore()
    store.addItem(1, 'Product A', 100, null, 2)
    store.addItem(1, 'Product A', 100, null, 3)

    expect(store.items).toHaveLength(1)
    expect(store.items[0].quantity).toBe(5)
    expect(store.itemCount).toBe(5)
    expect(store.totalAmount).toBe(500)
  })

  it('removeItem removes product by id', () => {
    const store = useCartStore()
    store.addItem(1, 'Product A', 100, null, 2)
    store.addItem(2, 'Product B', 200, null, 1)

    store.removeItem(1)

    expect(store.items).toHaveLength(1)
    expect(store.items[0].productId).toBe(2)
  })

  it('updateQuantity updates item quantity', () => {
    const store = useCartStore()
    store.addItem(1, 'Product A', 100, null, 2)
    store.updateQuantity(1, 5)

    expect(store.items[0].quantity).toBe(5)
    expect(store.totalAmount).toBe(500)
  })

  it('updateQuantity with 0 removes item', () => {
    const store = useCartStore()
    store.addItem(1, 'Product A', 100, null, 2)
    store.updateQuantity(1, 0)

    expect(store.items).toHaveLength(0)
  })

  it('clearCart empties all items', () => {
    const store = useCartStore()
    store.addItem(1, 'Product A', 100, null, 2)
    store.clearCart()

    expect(store.items).toEqual([])
    expect(store.itemCount).toBe(0)
  })

  it('persists to localStorage', async () => {
    const store = useCartStore()
    store.addItem(1, 'Product A', 100, null, 2)

    await nextTick() // Wait for watch to persist

    const stored = localStorage.getItem('peak-cart')
    expect(stored).toBeTruthy()
    const parsed = JSON.parse(stored!)
    expect(parsed).toHaveLength(1)
    expect(parsed[0].productId).toBe(1)
  })
})
