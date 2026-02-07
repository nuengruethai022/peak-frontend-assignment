<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <section class="home__hero">
      <h1 class="home__title">ยินดีต้อนรับ</h1>
      <p class="home__subtitle">
        ระบบร้านค้าออนไลน์ตัวอย่าง พร้อมตะกร้าสินค้า การค้นหา และการกรองตาม Tags
      </p>
      <RouterLink to="/products" class="home__cta">
        ดูรายการสินค้า
      </RouterLink>
    </section>

    <h2 class="home__section-title">ฟีเจอร์ของระบบ</h2>
    <section class="home__features" aria-label="ฟีเจอร์ของระบบ">
      <RouterLink to="/products" class="home__feature">
        <span class="home__feature-icon" aria-hidden="true">📦</span>
        <h3 class="home__feature-title">รายการสินค้า</h3>
        <p>ค้นหาสินค้าจากชื่อ กรองตาม tags และโหลดเพิ่มแบบ infinite scroll</p>
      </RouterLink>
      <RouterLink to="/cart" class="home__feature">
        <span class="home__feature-icon" aria-hidden="true">🛒</span>
        <h3 class="home__feature-title">ตะกร้าสินค้า</h3>
        <p>เพิ่มสินค้าลงตะกร้า ปรับจำนวน และบันทึกอัตโนมัติ</p>
      </RouterLink>
      <RouterLink to="/products" class="home__feature">
        <span class="home__feature-icon" aria-hidden="true">🔍</span>
        <h3 class="home__feature-title">รายละเอียดสินค้า</h3>
        <p>ดูรูปภาพ คำอธิบาย และเลือกจำนวนก่อนเพิ่มลงตะกร้า</p>
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.home {
  padding: 2rem 0;
  max-width: 960px;
  margin-inline: auto;
}

.home__hero {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 2.5rem 1.5rem;
  background: linear-gradient(135deg, var(--color-background-soft) 0%, var(--color-background-mute) 100%);
  border-radius: 16px;
  border: 1px solid var(--color-border);
}

.home__title {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  color: var(--color-heading);
}

@media (min-width: 640px) {
  .home__title {
    font-size: 2.5rem;
  }
}

.home__subtitle {
  font-size: 1.05rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.home__cta {
  display: inline-block;
  padding: 0.875rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  background: hsla(160, 100%, 37%, 1);
  color: white;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}

.home__cta:hover {
  background: hsla(160, 100%, 37%, 0.85);
  transform: translateY(-1px);
}

.home__cta:focus-visible {
  outline: 2px solid hsla(160, 100%, 37%, 0.5);
  outline-offset: 2px;
}

.home__section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1.25rem;
}

.home__features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .home__features {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}

.home__feature {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.home__feature:hover {
  border-color: hsla(160, 100%, 37%, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.home__feature:focus-visible {
  outline: 2px solid hsla(160, 100%, 37%, 0.5);
  outline-offset: 2px;
}

.home__feature-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.home__feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.home__feature p {
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.5;
  margin: 0;
}
</style>
