<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore, type CartItem } from '@/stores/cart'
import { useToast } from '@/composables/useToast'
import { formatPrice } from '@/utils/formatPrice'

const cartStore = useCartStore()
const { items, totalAmount } = storeToRefs(cartStore)
const toast = useToast()

function increment(item: CartItem) {
  cartStore.updateQuantity(item.productId, item.quantity + 1)
}

function decrement(item: CartItem) {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.productId, item.quantity - 1)
  }
}

function remove(item: CartItem) {
  cartStore.removeItem(item.productId)
  toast.showToast('Removed from cart', 'info')
}

function clearCart() {
  cartStore.clearCart()
  toast.showToast('Cart cleared', 'info')
}

function lineTotal(item: CartItem): number {
  return item.price * item.quantity
}
</script>

<template>
  <main class="cart">
    <h1 class="cart__title">ตะกร้าสินค้า</h1>

    <div v-if="items.length === 0" class="cart__empty">
      <p class="cart__empty-title">ตะกร้าว่าง</p>
      <p class="cart__empty-hint">ยังไม่มีสินค้าในตะกร้า ลองเลือกซื้อสินค้าจากหน้ารายการสินค้า</p>
      <RouterLink to="/products" class="cart__empty-link">ดูรายการสินค้า</RouterLink>
    </div>

    <template v-else>
      <div class="cart__actions">
        <RouterLink to="/products" class="cart__back-link">← กลับรายการสินค้า</RouterLink>
        <button
          type="button"
          class="cart__clear-btn"
          aria-label="ล้างตะกร้าทั้งหมด"
          @click="clearCart"
        >
          ล้างตะกร้า
        </button>
      </div>

      <TransitionGroup name="cart-item" tag="ul" class="cart__list">
        <li
          v-for="item in items"
          :key="item.productId"
          class="cart__item"
        >
          <RouterLink
            :to="{ name: 'product-detail', params: { id: item.productId } }"
            class="cart__item-image-wrap"
          >
            <img
              v-if="item.photo"
              :src="item.photo"
              :alt="item.title"
              class="cart__item-image"
              loading="lazy"
            />
            <div v-else class="cart__item-image cart__item-image--placeholder">
              ไม่มีรูป
            </div>
          </RouterLink>
          <div class="cart__item-info">
            <RouterLink
              :to="{ name: 'product-detail', params: { id: item.productId } }"
              class="cart__item-title"
            >
              {{ item.title }}
            </RouterLink>
            <p class="cart__item-price">{{ formatPrice(item.price) }} ต่อชิ้น</p>
          </div>
          <div class="cart__item-qty" role="group" :aria-label="`จำนวน ${item.title}`">
            <button
              type="button"
              class="cart__qty-btn"
              :disabled="item.quantity <= 1"
              :aria-label="`ลดจำนวน ${item.title}`"
              @click="decrement(item)"
            >
              −
            </button>
            <Transition name="qty" mode="out-in">
              <span :key="item.quantity" class="cart__qty-value">{{ item.quantity }}</span>
            </Transition>
            <button
              type="button"
              class="cart__qty-btn"
              :aria-label="`เพิ่มจำนวน ${item.title}`"
              @click="increment(item)"
            >
              +
            </button>
          </div>
          <p class="cart__item-total">{{ formatPrice(lineTotal(item)) }}</p>
          <button
            type="button"
            class="cart__item-remove"
            :aria-label="`ลบ ${item.title} ออกจากตะกร้า`"
            @click="remove(item)"
          >
            ×
          </button>
        </li>
      </TransitionGroup>

      <div class="cart__footer">
        <div class="cart__total">
          <span class="cart__total-label">ยอดรวม:</span>
          <span class="cart__total-amount">{{ formatPrice(totalAmount) }}</span>
        </div>
      </div>
    </template>
  </main>
</template>

<style src="@/styles/cart.css" scoped></style>
