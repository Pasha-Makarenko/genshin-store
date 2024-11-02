"use client"

import { useEffect, useState } from "react"
import { MOBILE_WIDTH } from "@/consts/mediaQueries"

export const useMaxWidth = (width = MOBILE_WIDTH) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    setMatches(window.matchMedia(`(min-width: ${width}px)`).matches)

    const resizeHandler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)

    mediaQuery.addEventListener("change", resizeHandler)

    return () => {
      mediaQuery.removeEventListener("change", resizeHandler)
    }
  }, [])

  return matches
}
