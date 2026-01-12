import "./globals.css"
import { ThemeProvider } from "@/context/ThemeContext"
import { FavoritesProvider } from "@/context/FavoritesContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
