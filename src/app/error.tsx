"use client"

import { useEffect } from "react"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error?.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  )
}
