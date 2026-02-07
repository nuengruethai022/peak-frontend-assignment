/**
 * สินค้า - ใช้ร่วมกันทั้ง ProductsView, ProductDetailView และ API
 */
export interface Product {
  id: number
  title: string
  description: string
  photos: string[]
  price: number
  tags: string[]
}
