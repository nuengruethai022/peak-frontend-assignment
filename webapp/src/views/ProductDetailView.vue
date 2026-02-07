<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useToast } from '@/composables/useToast'
import LazyImage from '@/components/LazyImage.vue'
import { fetchProductById } from '@/api/products'
import { formatPrice } from '@/utils/formatPrice'
import type { Product } from '@/types'

const toast = useToast()

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const selectedPhotoIndex = ref(0)
const quantity = ref(1)
const addCartAnimating = ref(false)

const productId = computed(() => Number(route.params.id))

const selectedPhoto = computed(() => {
  const p = product.value
  if (!p?.photos?.length) return null
  const idx = Math.min(selectedPhotoIndex.value, p.photos.length - 1)
  return p.photos[idx]
})

onMounted(() => fetchProduct())

watch(() => route.params.id, () => {
  selectedPhotoIndex.value = 0
  quantity.value = 1
  fetchProduct()
})

watch(quantity, (val) => {
  if (typeof val !== 'number' || val < 1 || Number.isNaN(val)) {
    quantity.value = 1
  }
})

async function fetchProduct() {
  loading.value = true
  error.value = null
  try {
    const data = await fetchProductById(productId.value)
    product.value = data ?? null
    if (!data) error.value = 'ไม่พบสินค้า'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'เกิดข้อผิดพลาดในการโหลดสินค้า'
    product.value = null
  } finally {
    loading.value = false
  }
}

function selectPhoto(index: number) {
  selectedPhotoIndex.value = index
}

function addToCart() {
  if (!product.value || quantity.value < 1) return
  cartStore.addItem(
    product.value.id,
    product.value.title,
    product.value.price,
    product.value.photos?.[0] ?? null,
    quantity.value
  )
  addCartAnimating.value = true
  toast.showToast('Added to cart', 'success')
  setTimeout(() => {
    addCartAnimating.value = false
  }, 400)
}

function goBack() {
  router.push({ name: 'products' })
}
</script>

<template>
  <main class="product-detail">
    <div v-if="loading" class="product-detail__loading">กำลังโหลด...</div>
    <div v-else-if="error" class="product-detail__error">
      {{ error }}
      <button
        type="button"
        class="product-detail__back-btn"
        aria-label="กลับไปหน้ารายการสินค้า"
        @click="goBack"
      >
        กลับรายการสินค้า
      </button>
    </div>

    <template v-else-if="product">
      <nav class="product-detail__breadcrumb" aria-label="เส้นทางนำทาง">
        <RouterLink to="/">หน้าแรก</RouterLink>
        <span class="product-detail__breadcrumb-sep">/</span>
        <RouterLink to="/products">สินค้า</RouterLink>
        <span class="product-detail__breadcrumb-sep">/</span>
        <span class="product-detail__breadcrumb-current" aria-current="page">{{ product.title }}</span>
      </nav>

      <button
        type="button"
        class="product-detail__back-btn product-detail__back-btn--inline"
        aria-label="กลับไปหน้ารายการสินค้า"
        @click="goBack"
      >
        ← กลับรายการสินค้า
      </button>

      <div class="product-detail__content">
        <div class="product-detail__gallery">
          <div class="product-detail__main-image">
            <LazyImage
              v-if="selectedPhoto"
              :src="selectedPhoto"
              :alt="`${product.title} - รูปที่ ${selectedPhotoIndex + 1}`"
            />
            <div
              v-else
              class="product-detail__image-placeholder"
            >
              ไม่มีรูป
            </div>
          </div>
          <div
            v-if="product.photos?.length > 1"
            class="product-detail__thumbnails"
            role="tablist"
            aria-label="รูปภาพสินค้า"
          >
            <button
              v-for="(photo, index) in product.photos"
              :key="index"
              type="button"
              class="product-detail__thumb"
              role="tab"
              :aria-selected="index === selectedPhotoIndex"
              :aria-label="`เลือกรูปที่ ${index + 1} จาก ${product.photos.length}`"
              :class="{ 'product-detail__thumb--active': index === selectedPhotoIndex }"
              @click="selectPhoto(index)"
            >
              <img :src="photo" :alt="`Thumbnail ${index + 1}`" loading="lazy" />
            </button>
          </div>
        </div>

        <div class="product-detail__info">
          <h1 class="product-detail__title">{{ product.title }}</h1>
          <p class="product-detail__price">{{ formatPrice(product.price) }}</p>

          <div v-if="product.tags?.length" class="product-detail__tags">
            <span
              v-for="tag in product.tags"
              :key="tag"
              class="product-detail__tag"
            >
              {{ tag }}
            </span>
          </div>

          <div class="product-detail__quantity" role="group" aria-labelledby="qty-label">
            <label id="qty-label" for="qty" class="product-detail__qty-label">จำนวน:</label>
            <div class="product-detail__qty-controls">
              <button
                type="button"
                class="product-detail__qty-btn"
                :disabled="quantity <= 1"
                aria-label="ลดจำนวน"
                @click="quantity = Math.max(1, quantity - 1)"
              >
                −
              </button>
              <input
                id="qty"
                v-model.number="quantity"
                type="number"
                min="1"
                class="product-detail__qty-input"
                aria-label="จำนวนชิ้น"
              />
              <button
                type="button"
                class="product-detail__qty-btn"
                aria-label="เพิ่มจำนวน"
                @click="quantity += 1"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            class="product-detail__add-cart"
            :class="{ added: addCartAnimating }"
            aria-label="เพิ่มลงตะกร้า"
            @click="addToCart"
          >
            เพิ่มลงตะกร้า
          </button>

          <div v-if="product.description" class="product-detail__description">
            <h2 class="product-detail__desc-title">รายละเอียดสินค้า</h2>
            <p class="product-detail__desc-text">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<style src="@/styles/product-detail.css" scoped></style>
