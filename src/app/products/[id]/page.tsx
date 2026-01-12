import Image from "next/image"
import { notFound } from "next/navigation"
import { Product } from "@/types/product"

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    notFound()
  }

  return res.json()
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params  
  const product = await getProduct(id)

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
        <h1 className="text-2xl font-bold mb-2">
          {product.title}
        </h1>

        <p className="text-gray-500 mb-4">
          Category: {product.category}
        </p>

        <p className="mb-6">
          {product.description}
        </p>

        <p className="text-xl font-semibold">
          ₹{product.price}
        </p>
      </div>
    </div>
  )
}
