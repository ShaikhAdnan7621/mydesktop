"use client"
import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("darkMode")
    const isSystem = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialDarkMode = saved ? saved === "true" : isSystem
    
    setIsDarkMode(initialDarkMode)
    document.documentElement.classList.toggle("dark", initialDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.classList.toggle("dark", newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
  }

  return [isDarkMode, toggleDarkMode, mounted]
}

export default function DarkModeToggle() {
  const [isDarkMode, toggleDarkMode, mounted] = useDarkMode()

  if (!mounted) return null

  return (
    <button
      onClick={toggleDarkMode}
      className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-75 shadow-lg hover:shadow-xl group"
      aria-label="Toggle Dark Mode"
      suppressHydrationWarning
    >
      <div suppressHydrationWarning>
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-150" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600 group-hover:rotate-12 transition-transform duration-150" />
        )}
      </div>
    </button>
  )
}
