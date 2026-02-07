# Frontend PEAK assignment

แบบทดสอบสำหรับ ผู้สมัครตำแหน่ง Software Engineer, Frontend การทำแบบทดสอบผู้สมัครจะต้องคำนึกถึงข้อกำหนดที่กล่าวไว้ด้านล่างเสมอ

### ข้อกำหนดในการทำแบบทดสอบ

code ที่เขียนออกมาต้องคำนึกด้วยว่าเราไม่ได้ทำงานคนเดียว code ของเราคนอื่นต้องสามารถทำงานต่อได้ง่าย อ่านเข้าใจและชัดเจนการทำงาน

web application ที่ทำออกมาต้องง่ายต่อผู้ใช้ง่าย ออกแบบประสบการณ์การใช้งานที่ดีให้กับผู้ที่มาใช้ user experience (UX)

## แบบทดสอบ "E-Commerce web application"

สร้าง web application สำหรับแสดงรายการสินค้าและเลือกสินค้าเข้าตะกร้า

### Core Requirements

#### 1. API Integration
- เชื่อมต่อ API ที่เตรียมไว้เพื่อดึงข้อมูลรายการสินค้า
- API call ควรถูกเรียกเพียงครั้งเดียวเมื่อ load หน้า หลีกเลี่ยง redundant requests
- จัดการ loading state และ error state อย่างเหมาะสม

#### ตัวอย่าง Response API

```
GET /api/products

Response Status 200:
{
    "products": [
    {
      "id": 1,
      "title": "Product Name 1",
      "description": "Lorem Ipsum is simply dummy text of ...",
      "photos": [
        "https://peakblobstoragesit.blob.core.windows.net/peakengine/Content/Image/PeakFrontendAssignment/P-EAK_02.png"
      ],
      "price": 1000,
      "tags": ["tag2", "tag1", "tag4"]
    },
    {
      "id": 2,
      "title": "Product Name 2",
      "description": "Lorem Ipsum is simply dummy text of ...",
      "photos": [
        "https://peakblobstoragesit.blob.core.windows.net/peakengine/Content/Image/PeakFrontendAssignment/P-EAK_02.png"
      ],
      "price": 1000,
      "tags": ["tag1", "tag4", "tag2"]
    }
  ]
}
```

#### 2. Product List Page (`/products`)
- แสดงรายการสินค้าจาก API พร้อมรูปสินค้า ชื่อ ราคา และ tags
- **Search Functionality**: ค้นหาสินค้าจากชื่อ (title) ด้วย debounce input
- **Tag Filter**: Filter สินค้าจาก tags หลายตัวพร้อมกัน แสดง tags ทั้งหมดให้เลือก
- **Combined Filtering**: Search และ filter ต้องทำงานร่วมกันได้
- **Display Feedback**: แสดง "Found X products" และ empty state เมื่อไม่มีผลลัพธ์
- **Visual Hierarchy**: Active filters แสดงเป็น "pills" ที่สามารถลบได้

#### 3. Product Detail Page (`/products/:id`)
- แสดง description ข้อมูลสินค้า และรูปทั้งหมด
- Gallery view สำหรับดูรูปต่างๆ (จาก photos array)
- Breadcrumb navigation หรือ "Back to List" button
- **Add to Cart button** พร้อม quantity selector

#### 4. Shopping Cart Page (`/cart`)
- แสดงรายการสินค้าที่เลือก พร้อม quantity และราคารวม
- **Quantity Management**: Increment/Decrement quantity ของแต่ละสินค้า
- **Remove Item**: ปุ่มลบสินค้าออกจากตะกร้า
- **Price Calculation**: แสดง total
- **Clear Cart**: ปุ่มเคลียร์ตะกร้าทั้งหมด
- **Cart Persistence**: Save cart to localStorage เพื่อ persist ข้อมูลหลังจาก refresh
- Empty cart state เมื่อยังไม่มีสินค้า

### Advanced Features (ท้าทายเพิ่มเติม)

- **Pagination หรือ Lazy Loading**: สำหรับจัดการกรณีมีสินค้าจำนวนมาก
- **Image Lazy Loading**: ใช้ lazy loading สำหรับรูปสินค้า
- **Toast Notifications**: แสดง feedback เมื่อ add/remove items จากตะกร้า
- **Micro-interactions**: Smooth animations เมื่อ add to cart, quantity changes
- **Responsive Design**: Mobile-first approach, tested บน tablet และ desktop
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support

### Technology Stack

- **Framework**: Vue 3 + TypeScript
- **State Management**: Pinia (สำหรับ products และ cart state)
- **Routing**: Vue Router
- **Testing**: Vitest (ตั้งค่าไว้แล้ว)
- **Code Quality**: ESLint + Prettier

## วิธีการ Run Service API

```bash
cd .\json-server\
```

```bash
npm install
```

```bash
node index.js
```

ดูข้อมูล json ได้ที่ http://localhost:3000/

## วิธีการ Run Web Application

```bash
cd .\webapp\
```

```bash
npm install
```

```bash
npm run dev
```

Web Application จะ run อยู่ที่ http://localhost:8080/

