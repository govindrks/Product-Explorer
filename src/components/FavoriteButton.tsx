"use client"

import { useFavorites } from "@/context/FavoritesContext"

export function FavoriteButton({ productId }: { productId: number }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFav = favorites.includes(productId)

  return (
    <button
      onClick={() => toggleFavorite(productId)}
      className={`text-xl ${isFav ? "text-red-500" : "text-gray-400"}`}
    >
      ♥
    </button>
  )
}
