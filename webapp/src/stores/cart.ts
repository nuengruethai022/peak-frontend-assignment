import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const CART_STORAGE_KEY = 'peak-cart'

export interface CartItem {
  productId: number
  title: string
  price: number
  photo: string | null
  quantity: number
}

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveToStorage(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadFromStorage())

  watch(
    items,
    (val) => saveToStorage(val),
    { deep: true }
  )

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalAmount = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  function addItem(
    productId: number,
    title: string,
    price: number,
    photo: string | null,
    quantity: number
  ) {
    const existing = items.value.find((i) => i.productId === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        productId,
        title,
        price,
        photo,
        quantity,
      })
    }
  }

  function removeItem(productId: number) {
    items.value = items.value.filter((i) => i.productId !== productId)
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find((i) => i.productId === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    itemCount,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
