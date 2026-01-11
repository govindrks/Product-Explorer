"use client"

import Link from "next/link"

type SortOrder = "none" | "lowToHigh" | "highToLow"

type NavbarProps = {
  search: string
  onSearchChange: (value: string) => void
  showFavs: boolean
  onToggleFavorites: () => void
  sortOrder: SortOrder
  onSortChange: (value: SortOrder) => void
}

export default function Navbar({
  search,
  onSearchChange,
  showFavs,
  onToggleFavorites,
  sortOrder,
  onSortChange,
}: NavbarProps) {
  return (
    <nav className="flex items-center gap-4 mb-6">
      
      
      <Link
        href="/"
        className="font-bold text-xl hover:text-blue-600 transition whitespace-nowrap cursor-pointer"
      >
        Nishant Shopee
      </Link>

      
      <div className="flex items-center gap-4 flex-1">
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="border p-2 rounded w-full"
        />

        <select
          value={sortOrder}
          onChange={e => onSortChange(e.target.value as SortOrder)}
          className="border p-2 rounded text-sm"
        >
          <option value="none">Sort</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>

        <button
          onClick={onToggleFavorites}
          className="px-4 py-2 border rounded text-sm whitespace-nowrap"
        >
          {showFavs ? "Show All" : "Favorites"}
        </button>
      </div>
    </nav>
  )
}
