"use client"

import { useEffect } from "react"

export default function ProductError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2">Failed to load product</h3>
      <p className="text-gray-600 mb-4">{error?.message || "Could not load product details."}</p>
      <button
        onClick={() => reset()}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Retry
      </button>
    </div>
  )
}
