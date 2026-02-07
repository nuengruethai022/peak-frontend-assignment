<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="about">
    <header class="about__header">
      <h1 class="about__title">เกี่ยวกับโปรเจกต์</h1>
    </header>

    <div class="about__grid">
      <section class="about__section" aria-labelledby="about-tech">
      <h2 id="about-tech" class="about__heading">Tech Stack</h2>
      <ul class="about__list">
        <li><strong>Vue 3</strong> + Composition API + TypeScript</li>
        <li><strong>Pinia</strong> – state management (ตะกร้าสินค้า)</li>
        <li><strong>Vue Router</strong> – routing</li>
        <li><strong>Vite</strong> – build tool</li>
        <li><strong>Vitest</strong> + Vue Test Utils – unit testing</li>
        <li><strong>json-server</strong> – mock API (port 3000)</li>
      </ul>
      </section>

      <section class="about__section" aria-labelledby="about-run">
      <h2 id="about-run" class="about__heading">วิธีรันโปรเจกต์</h2>
      <ol class="about__list about__list--ordered">
        <li>รัน API: <code>cd json-server && npm install && npm start</code></li>
        <li>รัน Web: <code>cd webapp && npm install && npm run dev</code></li>
        <li>เปิดเบราว์เซอร์ที่ <code>http://localhost:8080</code></li>
      </ol>
      <p class="about__hint">หมายเหตุ: ต้องรัน json-server ก่อน (API ที่ port 3000)</p>
      </section>

      <section class="about__section" aria-labelledby="about-commands">
      <h2 id="about-commands" class="about__heading">คำสั่งที่ใช้</h2>
      <ul class="about__list">
        <li><code>npm run dev</code> – รันโหมดพัฒนา</li>
        <li><code>npm run build</code> – build สำหรับ production</li>
        <li><code>npm run test:unit</code> – รัน unit tests</li>
      </ul>
      </section>

      <section class="about__section" aria-labelledby="about-features">
      <h2 id="about-features" class="about__heading">ฟีเจอร์หลัก</h2>
      <ul class="about__list">
        <li><strong>รายการสินค้า</strong> – ค้นหาจากชื่อ, กรองตาม tags, infinite scroll</li>
        <li><strong>รายละเอียดสินค้า</strong> – gallery รูปภาพ, เลือกจำนวน, เพิ่มลงตะกร้า</li>
        <li><strong>ตะกร้าสินค้า</strong> – ปรับจำนวน, ลบรายการ, บันทึกอัตโนมัติใน localStorage</li>
        <li><strong>Toast notifications</strong> – แจ้งเตือนเมื่อเพิ่ม/ลบสินค้า</li>
        <li><strong>Responsive</strong> – รองรับมือถือและ desktop</li>
        <li><strong>Accessibility</strong> – ARIA labels, semantic HTML, keyboard navigation</li>
      </ul>
      </section>
    </div>

    <footer class="about__footer">
      <RouterLink to="/products" class="about__link">← ดูรายการสินค้า</RouterLink>
    </footer>
  </main>
</template>

<style scoped>
.about {
  max-width: 900px;
  margin-inline: auto;
  padding: 2rem 0;
}

.about__header {
  margin-bottom: 2rem;
}

.about__title {
  font-size: 1.75rem;
  color: var(--color-heading);
}

.about__grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .about__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

.about__section {
  padding: 1.5rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.about__footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.about__heading {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.75rem;
}

.about__list {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.8;
  color: var(--color-text);
}

.about__list--ordered {
  padding-left: 1.5rem;
}

.about__list li {
  margin-bottom: 0.35rem;
}

.about__list li:last-child {
  margin-bottom: 0;
}

.about__list code {
  font-size: 0.9em;
  padding: 0.15rem 0.4rem;
  background: var(--color-background-mute);
  border-radius: 4px;
  font-family: ui-monospace, monospace;
}

.about__hint {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--vt-c-text-light-2);
}

.about__link {
  display: inline-block;
  font-size: 0.95rem;
  color: hsla(160, 100%, 37%, 1);
  text-decoration: none;
}

.about__link:hover {
  text-decoration: underline;
}

.about__link:focus-visible {
  outline: 2px solid hsla(160, 100%, 37%, 0.5);
  outline-offset: 2px;
}
</style>
