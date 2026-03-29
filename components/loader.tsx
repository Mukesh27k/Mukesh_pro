"use client"

import { useEffect, useState } from "react"

export function Loader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo/Name */}
      <div className="mb-10 text-5xl font-bold">
        <span className="gradient-text">MK</span>
      </div>

      {/* Loading bar */}
      <div className="relative h-1.5 w-56 overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-blue to-accent-indigo transition-all duration-200"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-5 font-mono text-sm text-muted-foreground">
        {Math.min(Math.round(progress), 100)}%
      </p>

      {/* Decorative elements - subtle light gradients */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-accent-blue/5 blur-[100px] animate-pulse" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-accent-indigo/5 blur-[100px] animate-pulse delay-500" />
    </div>
  )
}
