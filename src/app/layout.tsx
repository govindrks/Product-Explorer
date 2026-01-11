import "./globals.css"
import { FavoritesProvider } from "@/context/FavoritesContext"

export const metadata = {
  title: "Product Explorer",
  description: "Product Explorer Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  )
}
