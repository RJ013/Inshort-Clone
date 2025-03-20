"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import NewsCard from "./news-card"
import type { NewsItem } from "@/lib/types"

interface NewsNavigationProps {
  newsItems: NewsItem[]
}

export default function NewsNavigation({ newsItems }: NewsNavigationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isUpSwipe = distance > minSwipeDistance
    const isDownSwipe = distance < -minSwipeDistance

    if (isUpSwipe && currentIndex < newsItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }

    if (isDownSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < newsItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (e.key === "ArrowDown" && currentIndex < newsItems.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, newsItems.length])

  return (
    <div
      className="h-full pt-16 pb-4 px-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-full">
        {newsItems.map((news, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex ? "translate-y-0" : index < currentIndex ? "-translate-y-full" : "translate-y-full"
            }`}
          >
            <NewsCard news={news} isActive={index === currentIndex} />
          </div>
        ))}

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full opacity-80 shadow-md"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full opacity-80 shadow-md"
            onClick={goToNext}
            disabled={currentIndex === newsItems.length - 1}
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-1">
            {newsItems.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full ${index === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

