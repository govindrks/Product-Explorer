import "./globals.css"
import { ThemeProvider } from "@/context/ThemeContext"
import { FavoritesProvider } from "@/context/FavoritesContext"

// Inline script to set initial theme before React hydrates.
const setInitialTheme = `
(function(){
  try{
    var theme = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }catch(e){}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>

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
