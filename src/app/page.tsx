"use client"

import { useEffect, useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import { useFavorites } from "@/context/FavoritesContext"
import { ProductCard } from "@/components/ProductCard"
import Navbar from "@/components/Navbar"

const ITEMS_PER_PAGE = 8

export default function HomePage() {
  const { products, loading, error } = useProducts()
  const { favorites } = useFavorites()

  const [search, setSearch] = useState("")
  const [showFavs, setShowFavs] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // 🔍 Search + Favorites filter
  const filteredProducts = products.filter(product => {
    const matchTitle = product.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchFavorites =
      !showFavs || favorites.includes(product.id)

    return matchTitle && matchFavorites
  })

  // 🔢 Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, showFavs])

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4">{error}</p>

  return (
    <div className="p-4">
      {/* Navbar */}
      <Navbar
        search={search}
        onSearchChange={setSearch}
        showFavs={showFavs}
        onToggleFavorites={() => setShowFavs(prev => !prev)}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}

        {paginatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
