"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"
import { FavoriteButton } from "./FavoriteButton"

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="mx-auto object-contain h-40"
        />
        <h3 className="mt-2 font-semibold line-clamp-2">{product.title}</h3>
      </Link>

      <p className="text-sm text-gray-500">{product.category}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold">₹{product.price}</span>
        <FavoriteButton productId={product.id} />
      </div>
    </div>
  )
}
