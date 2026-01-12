"use client"

import { useMemo, useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { ProductCard } from "@/components/ProductCard"
import { productService } from "@/lib/api"
import { useFavorites } from "@/context/FavoritesContext"
import { Product } from "@/types/product"

const ITEMS_PER_PAGE = 8
type SortOrder = "none" | "lowToHigh" | "highToLow"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { favorites } = useFavorites()

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [showFavs, setShowFavs] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>("none")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let mounted = true
    productService
      .getProducts()
      .then(data => {
        if (mounted) setProducts(data)
      })
      .catch(err => {
        if (mounted) setError(err.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const filtersKey = `${search}|${category}|${showFavs}|${sortOrder}`
  const [lastFiltersKey, setLastFiltersKey] = useState(filtersKey)

  if (filtersKey !== lastFiltersKey) {
    setLastFiltersKey(filtersKey)
    setCurrentPage(1)
  }

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)))
  }, [products])

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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4">{error}</p>

  return (
    <div className="p-4 min-h-screen">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        categories={categories}
        onCategoryChange={setCategory}
        showFavs={showFavs}
        onToggleFavorites={() => setShowFavs(p => !p)}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
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
