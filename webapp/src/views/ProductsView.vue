<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import LazyImage from '@/components/LazyImage.vue'
import { fetchProducts } from '@/api/products'
import { formatPrice } from '@/utils/formatPrice'
import type { Product } from '@/types'

const PAGE_SIZE = 20

const allProducts = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchInput = ref('')
const searchQuery = ref('')
const selectedTags = ref<Set<string>>(new Set())
const displayCount = ref(PAGE_SIZE)

let debounceTimer: ReturnType<typeof setTimeout> | null = null
const DEBOUNCE_MS = 300

const allTags = computed(() => {
  const tags = new Set<string>()
  for (const p of allProducts.value) {
    for (const tag of p.tags ?? []) {
      if (tag) tags.add(tag)
    }
  }
  return Array.from(tags).sort()
})

function toggleTag(tag: string) {
  const next = new Set(selectedTags.value)
  if (next.has(tag)) {
    next.delete(tag)
  } else {
    next.add(tag)
  }
  selectedTags.value = next
}

const activeFilters = computed(() => {
  const filters: { type: 'search' | 'tag'; label: string; value: string }[] = []
  if (searchQuery.value) {
    filters.push({
      type: 'search',
      label: `ค้นหา: "${searchQuery.value}"`,
      value: searchQuery.value,
    })
  }
  for (const tag of selectedTags.value) {
    filters.push({ type: 'tag', label: tag, value: tag })
  }
  return filters
})

function removeFilter(type: 'search' | 'tag', value: string) {
  if (type === 'search') {
    searchInput.value = ''
    searchQuery.value = ''
  } else {
    toggleTag(value)
  }
}

function clearAllFilters() {
  searchInput.value = ''
  searchQuery.value = ''
  selectedTags.value = new Set()
}

watch(searchInput, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    searchQuery.value = val.trim().toLowerCase()
    debounceTimer = null
  }, DEBOUNCE_MS)
})

const filteredProducts = computed(() => {
  let list = allProducts.value
  const q = searchQuery.value
  if (q) {
    list = list.filter((p) => p.title.toLowerCase().includes(q))
  }
  const tags = selectedTags.value
  if (tags.size > 0) {
    list = list.filter((p) =>
      [...tags].every((t) => (p.tags ?? []).includes(t))
    )
  }
  return list
})

const visibleProducts = computed(() =>
  filteredProducts.value.slice(0, displayCount.value)
)

const hasMore = computed(
  () => visibleProducts.value.length < filteredProducts.value.length
)

watch([searchQuery, selectedTags], () => {
  displayCount.value = PAGE_SIZE
})

const loadMoreRef = ref<HTMLElement | null>(null)
let loadMoreObserver: IntersectionObserver | null = null

function loadMore() {
  displayCount.value = Math.min(
    displayCount.value + PAGE_SIZE,
    filteredProducts.value.length
  )
}

onMounted(async () => {
  try {
    allProducts.value = await fetchProducts()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'เกิดข้อผิดพลาดในการโหลดสินค้า'
  } finally {
    loading.value = false
  }
})

watch(
  loadMoreRef,
  (el) => {
    loadMoreObserver?.disconnect()
    if (!el) return
    loadMoreObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && hasMore.value) {
            loadMore()
          }
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    )
    loadMoreObserver.observe(el)
  },
  { flush: 'post' }
)

onUnmounted(() => {
  loadMoreObserver?.disconnect()
})

</script>

<template>
  <main class="products">
    <header class="products__header">
      <h1 class="products__title">รายการสินค้า</h1>
      <p v-if="!loading && !error" class="products__count products__count--header">
        {{ filteredProducts.length }} สินค้า
        <span v-if="hasMore && filteredProducts.length > 0">
          (แสดง {{ visibleProducts.length }}/{{ filteredProducts.length }})
        </span>
      </p>
    </header>

    <div v-if="!loading && !error" class="products__filters">
      <div class="products__search">
        <input
          v-model="searchInput"
          type="search"
          class="products__search-input"
          placeholder="ค้นหาสินค้าจากชื่อ..."
          autocomplete="off"
          aria-label="ค้นหาสินค้าจากชื่อ"
        />
      </div>
      <div v-if="allTags.length" class="products__tags">
        <span class="products__tags-label" id="tags-label">ตัวกรอง Tags:</span>
        <div class="products__tags-list" role="group" aria-labelledby="tags-label">
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            class="products__tag-btn"
            :class="{ 'products__tag-btn--active': selectedTags.has(tag) }"
            :aria-pressed="selectedTags.has(tag)"
            :aria-label="`กรองตาม ${tag}`"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div v-if="activeFilters.length" class="products__active">
        <span class="products__active-label">ตัวกรองที่เลือก:</span>
        <div class="products__active-pills">
          <span
            v-for="f in activeFilters"
            :key="`${f.type}-${f.value}`"
            class="products__pill"
          >
            {{ f.label }}
            <button
              type="button"
              class="products__pill-remove"
              :aria-label="`ยกเลิกตัวกรอง ${f.label}`"
              @click="removeFilter(f.type, f.value)"
            >
              ×
            </button>
          </span>
          <button
            type="button"
            class="products__pill-clear"
            aria-label="ล้างตัวกรองทั้งหมด"
            @click="clearAllFilters"
          >
            ล้างทั้งหมด
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="products__loading">กำลังโหลด...</div>
    <div v-else-if="error" class="products__error">{{ error }}</div>

    <template v-else>
      <p v-if="filteredProducts.length > 0" class="products__count products__count--results">
        แสดง {{ visibleProducts.length }} จาก {{ filteredProducts.length }} สินค้า
      </p>

      <div v-if="filteredProducts.length === 0" class="products__empty">
        <p class="products__empty-title">ไม่พบสินค้า</p>
        <p class="products__empty-hint">
          ลองเปลี่ยนคำค้นหรือยกเลิกตัวกรอง tags เพื่อดูผลลัพธ์เพิ่มเติม
        </p>
      </div>
      <ul v-else class="products__grid">
      <li v-for="product in visibleProducts" :key="product.id" class="product-card">
        <RouterLink
          :to="{ name: 'product-detail', params: { id: product.id } }"
          class="product-card__link"
        >
          <div class="product-card__image-wrap">
            <LazyImage
              v-if="product.photos?.length"
              :src="product.photos[0]"
              :alt="product.title"
            />
            <div v-else class="product-card__image product-card__image--placeholder">
              ไม่มีรูป
            </div>
          </div>
          <div class="product-card__body">
            <h2 class="product-card__title">{{ product.title }}</h2>
            <p class="product-card__price">{{ formatPrice(product.price) }}</p>
            <div v-if="product.tags?.length" class="product-card__tags">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="product-card__tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>
      <div
        v-if="hasMore"
        ref="loadMoreRef"
        class="products__load-more"
        aria-hidden="true"
      />
    </template>
  </main>
</template>

<style src="@/styles/products.css" scoped></style>
