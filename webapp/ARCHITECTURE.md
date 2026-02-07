# โครงสร้างโปรเจกต์

เอกสารนี้อธิบายโครงสร้างและแนวทางการเขียนโค้ด สำหรับให้นักพัฒนาคนอื่นทำงานต่อได้ง่าย

## โครงสร้างโฟลเดอร์

```
src/
├── api/           # API calls - แยก logic การดึงข้อมูล
│   └── products.ts
├── assets/        # ไฟล์สแตติก (รูป, font)
├── components/    # Vue components ที่ใช้ซ้ำได้
├── composables/   # Composition API logic ที่ใช้ซ้ำ
├── router/        # Vue Router config
├── stores/        # Pinia stores (state management)
├── styles/        # CSS แยกตามหน้า/component
├── types/         # TypeScript interfaces ที่ใช้ร่วมกัน
├── utils/         # ฟังก์ชันช่วยเหลือ (formatPrice ฯลฯ)
└── views/         # หน้าในแอป (แต่ละ route)
```

## แนวทางการเขียนโค้ด

### 1. Types - ใช้ร่วมกัน
- นิยาม interface ใน `src/types/`
- เช่น `Product` ใช้ใน ProductsView, ProductDetailView, API
- หลีกเลี่ยงการนิยาม interface ซ้ำในหลายไฟล์

### 2. API Layer
- เรียก API ใน `src/api/` เท่านั้น
- Views ไม่ควรมี `fetch()` โดยตรง
- เปลี่ยน API base URL ได้ที่เดียวใน `api/products.ts`

### 3. Utils
- ฟังก์ชันที่ใช้ซ้ำ (เช่น `formatPrice`) ใส่ใน `src/utils/`
- ควรเป็น pure function ไม่มี side effect

### 4. Components
- แยก component เมื่อใช้ซ้ำ 2+ ที่
- ตั้งชื่อให้สื่อความหมาย (LazyImage, ToastContainer)

### 5. Styles
- CSS แยกไฟล์ใน `src/styles/` ตามหน้าที่ใช้
- ใช้ BEM หรือ convention เดียวกัน (เช่น `cart__item`, `products__grid`)

### 6. Comments
- เขียน comment เป็นภาษาไทยเมื่อ logic ซับซ้อน
- ไฟล์ที่มีหน้าที่เฉพาะใส่ JSDoc บรรทัดแรก

## การเพิ่มฟีเจอร์ใหม่

1. **หน้าใหม่**: สร้างใน `views/`, เพิ่ม route ใน `router/index.ts`
2. **API ใหม่**: เพิ่มฟังก์ชันใน `api/` (หรือสร้างไฟล์ใหม่)
3. **Type ใหม่**: เพิ่มใน `types/`
4. **Component ใช้ซ้ำ**: สร้างใน `components/` พร้อม test ใน `__tests__/`
