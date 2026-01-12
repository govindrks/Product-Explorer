"use client"

import { createContext, useContext, useEffect, useState } from "react"

type ThemeContextType = {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initial value: rely on pre-hydration script which sets the `dark` class on <html>
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false
    return document.documentElement.classList.contains("dark")
  })

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
      try {
        localStorage.setItem("theme", "dark")
      } catch {}
    } else {
      html.classList.remove("dark")
      try {
        localStorage.setItem("theme", "light")
      } catch {}
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
