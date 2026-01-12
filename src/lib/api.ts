import axios from "axios"
import { Product } from "@/types/product"

const BASE_URL = "https://fakestoreapi.com"

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
})

// Simple interceptor for logging and error normalization
api.interceptors.request.use(config => {
  // we can add auth headers here if needed later
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    // normalize error
    const message = err?.response?.data?.message || err.message || "Request failed"
    return Promise.reject(new Error(message))
  }
)

export const productService = {
  async getProducts(): Promise<Product[]> {
    const res = await api.get<Product[]>('/products')
    return res.data
  },

  async getProductById(id: string): Promise<Product> {
    const res = await api.get<Product>(`/products/${id}`)
    return res.data
  },
}
