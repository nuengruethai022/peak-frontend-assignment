<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  src: string
  alt: string
}>()

const wrapperRef = ref<HTMLElement | null>(null)
const shouldLoad = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!wrapperRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          shouldLoad.value = true
          observer?.unobserve(entry.target)
        }
      }
    },
    {
      rootMargin: '50px',
      threshold: 0.01,
    }
  )

  observer.observe(wrapperRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="wrapperRef" class="lazy-image-wrapper">
    <img
      v-if="shouldLoad"
      :src="src"
      :alt="alt"
      class="lazy-image"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<style scoped>
.lazy-image-wrapper {
  width: 100%;
  height: 100%;
  background: var(--color-background-mute, #f2f2f2);
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
