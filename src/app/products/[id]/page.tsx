import { fetchProductById } from "@/lib/api"
import Image from "next/image"

export default async function ProductDetails({
  params,
}: {
  params: { id: string }
}) {
  const product = await fetchProductById(params.id)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="mx-auto"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-500">{product.category}</p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-2 font-bold text-lg">₹{product.price}</p>
    </div>
  )
}
