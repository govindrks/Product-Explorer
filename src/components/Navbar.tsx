"use client"

import Link from "next/link"
import { useTheme } from "@/context/ThemeContext"

type SortOrder = "none" | "lowToHigh" | "highToLow"

type NavbarProps = {
  search: string
  onSearchChange: (value: string) => void

  category: string
  categories: string[]
  onCategoryChange: (value: string) => void

  showFavs: boolean
  onToggleFavorites: () => void

  sortOrder: SortOrder
  onSortChange: (value: SortOrder) => void
}

export default function Navbar({
  search,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
  showFavs,
  onToggleFavorites,
  sortOrder,
  onSortChange,
}: NavbarProps) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="flex items-center gap-4 mb-6 p-4 rounded card">
      {/* Logo */}
      <Link
        href="/"
        className="font-bold text-xl hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap"
      >
        Nishant Shopee
      </Link>

      <div className="flex items-center gap-3 flex-1">
        {/* Search */}
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="border p-2 rounded w-full"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
          className="border p-2 rounded text-sm bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={e => onSortChange(e.target.value as SortOrder)}
          className="border p-2 rounded text-sm bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="none">Sort</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>

        {/* Favorites */}
        <button
          onClick={onToggleFavorites}
          className="px-4 py-2 border rounded text-sm whitespace-nowrap"
        >
          {showFavs ? "Show All" : "Favorites"}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="px-3 py-2 border rounded"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  )
}
