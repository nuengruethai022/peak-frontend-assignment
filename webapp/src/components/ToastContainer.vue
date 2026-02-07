<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, dismissToast } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" aria-live="polite">
      <TransitionGroup name="toast" tag="div" class="toast-list">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="[`toast--${toast.type}`]"
          role="alert"
        >
          <span class="toast__message">{{ toast.message }}</span>
          <button
            type="button"
            class="toast__close"
            aria-label="ปิด"
            @click="dismissToast(toast.id)"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
/* Mobile-first toast positioning */
.toast-container {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

@media (min-width: 640px) {
  .toast-container {
    top: 1rem;
    right: 1rem;
    left: auto;
    max-width: 360px;
  }
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: auto;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  width: 100%;
  padding: 0.6rem 0.875rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: var(--color-background, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  color: var(--color-text, #333);
}

@media (min-width: 640px) {
  .toast {
    min-width: 240px;
    width: auto;
    padding: 0.75rem 1rem;
  }
}

.toast--success {
  background: hsla(160, 100%, 37%, 0.15);
  border-color: hsla(160, 100%, 37%, 0.5);
  color: var(--color-text);
}

.toast--info {
  background: var(--color-background-soft, #f5f5f5);
  border-color: var(--color-border, #e0e0e0);
}

.toast--error {
  background: rgba(231, 76, 60, 0.15);
  border-color: rgba(231, 76, 60, 0.5);
  color: #c0392b;
}

.toast__message {
  flex: 1;
  font-size: 0.9rem;
}

.toast__close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.toast__close:hover {
  opacity: 1;
}

.toast__close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
