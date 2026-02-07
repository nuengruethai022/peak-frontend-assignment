import type { Product } from '@/types'

const API_BASE = '/api'

/**
 * ดึงรายการสินค้าทั้งหมด
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return Array.isArray(data) ? data : data.products ?? []
}

/**
 * ดึงข้อมูลสินค้าตาม ID
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/products/${id}`)
  if (!res.ok) return null
  return res.json()
}
