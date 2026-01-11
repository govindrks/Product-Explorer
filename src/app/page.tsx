"use client"

import { useEffect, useMemo, useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import { useFavorites } from "@/context/FavoritesContext"
import { ProductCard } from "@/components/ProductCard"
import Navbar from "@/components/Navbar"

const ITEMS_PER_PAGE = 8
type SortOrder = "none" | "lowToHigh" | "highToLow"

export default function HomePage() {
  const { products, loading, error } = useProducts()
  const { favorites } = useFavorites()

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [showFavs, setShowFavs] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>("none")
  const [currentPage, setCurrentPage] = useState(1)

  // 🧩 Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)))
  }, [products])

  // 🔍 FILTER + SORT
  let filteredProducts = products.filter(product => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchCategory =
      category === "all" || product.category === category

    const matchFavorites =
      !showFavs || favorites.includes(product.id)

    return matchSearch && matchCategory && matchFavorites
  })

  // 🔃 SORT
  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    )
  }

  if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    )
  }

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, category, showFavs, sortOrder])

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4">{error}</p>

  return (
    <div className="p-4">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        categories={categories}
        onCategoryChange={setCategory}
        showFavs={showFavs}
        onToggleFavorites={() => setShowFavs(prev => !prev)}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
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

      {/* Pagination */}
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
