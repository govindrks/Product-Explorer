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
    <nav className="card mb-6 p-3 md:p-4 rounded">
      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
        <div className="flex items-center justify-between mb-3 md:mb-0">
          <Link
            href="/"
            className="font-bold text-lg md:text-xl hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap"
          >
            Nishant Shopee
          </Link>

          <div className="md:hidden ml-3">
            <button
              onClick={toggleTheme}
              className="px-2 py-1 border rounded"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 md:flex-1">
          <input
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="border p-2 rounded w-full sm:flex-1"
          />

          <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
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

            <select
              value={sortOrder}
              onChange={e => onSortChange(e.target.value as SortOrder)}
              className="border p-2 rounded text-sm bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="none">Sort</option>
              <option value="lowToHigh">Price: Low → High</option>
              <option value="highToLow">Price: High → Low</option>
            </select>

            <button
              onClick={onToggleFavorites}
              className="px-3 py-2 border rounded text-sm whitespace-nowrap bg-white dark:bg-gray-700 dark:text-white"
            >
              {showFavs ? "Show All" : "Favorites"}
            </button>

            <div className="hidden md:block">
              <button
                onClick={toggleTheme}
                className="px-3 py-2 border rounded"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
