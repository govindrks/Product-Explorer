"use client"

import { useProducts } from "@/hooks/useProducts"
import { ProductCard } from "@/components/ProductCard"
import { useFavorites } from "@/context/FavoritesContext"
import { useState } from "react"

export default function HomePage() {
  const { products, loading, error } = useProducts()
  const { favorites } = useFavorites()
  const [search, setSearch] = useState("")
  const [showFavs, setShowFavs] = useState(false)

  const filtered = products.filter(p => {
    const matchTitle = p.title.toLowerCase().includes(search.toLowerCase())
    const matchFav = !showFavs || favorites.includes(p.id)
    return matchTitle && matchFav
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search products..."
          className="border p-2 rounded w-full"
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setShowFavs(p => !p)}>
          Favorites
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
