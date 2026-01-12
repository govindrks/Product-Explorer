"use client"

import { createContext, useContext, useEffect, useState } from "react"

type FavoritesContextType = {
  favorites: number[]
  toggleFavorite: (id: number) => void
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Lazy initialization (NO setState in effect)
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("favorites")
    return stored ? JSON.parse(stored) : []
  })

  // Effect only syncs localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider")
  }
  return ctx
}
