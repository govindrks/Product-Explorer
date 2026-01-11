"use client"

import Link from "next/link"

type NavbarProps = {
  search: string
  onSearchChange: (value: string) => void
  showFavs: boolean
  onToggleFavorites: () => void
}

export default function Navbar({
  search,
  onSearchChange,
  showFavs,
  onToggleFavorites,
}: NavbarProps) {
  return (
    <nav className="flex items-center gap-4 mb-6">
      
      <Link
        href="/"
        className="font-bold text-xl hover:text-blue-600 transition"
      >
        Nishant Shopee
      </Link>

     
      <input
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded w-full"
      />

      <button
        onClick={onToggleFavorites}
        className="px-4 py-2 border rounded text-sm whitespace-nowrap"
      >
        {showFavs ? "Show All" : "Favorites"}
      </button>
    </nav>
  )
}
