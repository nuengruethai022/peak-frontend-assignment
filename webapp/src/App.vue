<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import ToastContainer from '@/components/ToastContainer.vue'

const cartStore = useCartStore()
const { itemCount } = storeToRefs(cartStore)
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handleResize() {
  if (window.innerWidth >= 640) {
    menuOpen.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) {
    closeMenu()
  }
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar">
    <img alt="Vue logo" class="navbar__logo" src="@/assets/logo.svg" width="40" height="40" />
    <nav class="navbar__nav navbar__nav--desktop" aria-label="เมนูหลัก">
      <RouterLink to="/" @click="closeMenu">หน้าแรก</RouterLink>
      <RouterLink to="/products" @click="closeMenu">สินค้า</RouterLink>
      <RouterLink
        to="/cart"
        class="navbar__cart-link"
        :aria-label="itemCount > 0 ? `ตะกร้า มี ${itemCount} รายการ` : 'ตะกร้า'"
        @click="closeMenu"
      >
        ตะกร้า
        <Transition name="badge">
          <span v-if="itemCount > 0" :key="itemCount" class="navbar__cart-badge">{{ itemCount }}</span>
        </Transition>
      </RouterLink>
      <RouterLink to="/about" @click="closeMenu">เกี่ยวกับ</RouterLink>
    </nav>

    <button
      type="button"
      class="navbar__hamburger"
      aria-label="เปิดเมนู"
      :aria-expanded="menuOpen"
      :aria-pressed="menuOpen"
      @click="toggleMenu"
    >
      <span class="navbar__hamburger-line" />
      <span class="navbar__hamburger-line" />
      <span class="navbar__hamburger-line" />
    </button>
  </header>

  <Transition name="menu">
    <div
      v-if="menuOpen"
      class="navbar__overlay"
      aria-hidden="true"
      @click="closeMenu"
    />
  </Transition>

  <Transition name="menu">
    <nav
      v-if="menuOpen"
      class="navbar__mobile"
      aria-label="เมนูมือถือ"
    >
      <div class="navbar__mobile-header">
        <img alt="Vue logo" class="navbar__mobile-logo" src="@/assets/logo.svg" width="48" height="48" />
      </div>
      <RouterLink to="/" class="navbar__mobile-link" @click="closeMenu">หน้าแรก</RouterLink>
      <RouterLink to="/products" class="navbar__mobile-link" @click="closeMenu">สินค้า</RouterLink>
      <RouterLink
        to="/cart"
        class="navbar__mobile-link navbar__mobile-link--cart"
        :aria-label="itemCount > 0 ? `ตะกร้า มี ${itemCount} รายการ` : 'ตะกร้า'"
        @click="closeMenu"
      >
        ตะกร้า
        <span v-if="itemCount > 0" class="navbar__mobile-badge">{{ itemCount }}</span>
      </RouterLink>
      <RouterLink to="/about" class="navbar__mobile-link" @click="closeMenu">เกี่ยวกับ</RouterLink>
    </nav>
  </Transition>

  <RouterView />
  <ToastContainer />
</template>

<style src="@/styles/navbar.css" scoped></style>
