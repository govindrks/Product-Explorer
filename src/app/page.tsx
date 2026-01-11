"use client"

import { useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import { useFavorites } from "@/context/FavoritesContext"
import { ProductCard } from "@/components/ProductCard"
import Navbar from "@/components/Navbar"

export default function HomePage() {
  const { products, loading, error } = useProducts()
  const { favorites } = useFavorites()

  const [search, setSearch] = useState("")
  const [showFavs, setShowFavs] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchTitle = product.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchFavorites =
      !showFavs || favorites.includes(product.id)

    return matchTitle && matchFavorites
  })

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4">{error}</p>

  return (
    <div className="p-4">
      
     
      <Navbar
        search={search}
        onSearchChange={setSearch}
        showFavs={showFavs}
        onToggleFavorites={() => setShowFavs(prev => !prev)}
      />

      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}

        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
