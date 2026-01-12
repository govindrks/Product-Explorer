"use client"

import { createContext, useContext, useEffect, useState } from "react"

type ThemeContextType = {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state lazily
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false
    const stored = localStorage.getItem("theme")
    if (stored === "dark") return true
    if (stored === "light") return false
    // fallback to OS preference
    try {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    } catch {
      return false
    }
  })

  // Effect only syncs DOM (NO setState)
  useEffect(() => {
    const html = document.documentElement

    if (isDark) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    // debug
    console.debug("ThemeProvider: isDark=", isDark, "html classes=", html.className)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      console.debug("ThemeProvider.toggleTheme ->", next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}
