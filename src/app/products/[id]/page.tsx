"use client"

import * as React from "react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { productService } from "@/lib/api"

type ReactUseType = { use?: <T>(p: Promise<T>) => T }

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const reactUse = React as unknown as ReactUseType
  const idObj = reactUse.use ? reactUse.use(params) : (params as unknown as { id: string })
  const { id } = idObj

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    productService
      .getProductById(id)
      .then(p => {
        if (mounted) setProduct(p)
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err)
        if (mounted) setError(msg || "Failed to load product")
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [id])

  if (loading) return (
    <div className="p-6">
      <p className="text-gray-500">Loading product...</p>
    </div>
  )

  if (error || !product) return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2">Failed to load product</h3>
      <p className="text-gray-600 mb-4">{error ?? "Could not load product details."}</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={350}
          height={350}
          className="object-contain"
          priority
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

        <p className="text-gray-500 mb-4">Category: {product.category}</p>

        <p className="mb-6">{product.description}</p>

        <p className="text-xl font-semibold">₹{product.price}</p>
      </div>
    </div>
  )
}
