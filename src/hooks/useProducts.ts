"use client"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/api"
import { Product } from "@/types/product"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}
