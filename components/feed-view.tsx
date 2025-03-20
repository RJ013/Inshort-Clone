"use client"

import { useRef, useEffect, useMemo, useState } from "react"
import ContentCard from "./content-card"
import type { NewsItem } from "@/lib/types"

interface FeedViewProps {
  items: NewsItem[]
}

// Function to extract numeric time value from strings like "3 days ago"
const extractTimeValue = (time: string): number => {
  const match = time.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

export default function FeedView({ items }: FeedViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Sort items based on time (latest first)
  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) => extractTimeValue(a.time) - extractTimeValue(b.time)
      ),
    [items]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === 'undefined') return

    // Intersection Observer to handle visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveIndex(index)
          }
        })
      },
      {
        root: container,
        threshold: 0.5,
        rootMargin: "0px",
      }
    )

    // Using setTimeout to ensure the DOM is fully rendered
    setTimeout(() => {
      const cards = container.querySelectorAll("[data-index]")
      cards.forEach((card) => observer.observe(card))
    }, 0)

    return () => {
      observer.disconnect()
    }
  }, [sortedItems])

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-scroll snap-y snap-mandatory feed-container"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx>{`
        .feed-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {sortedItems.map((item, index) => (
        <div 
          key={item.title} 
          data-index={index}
          className={`snap-start h-full w-full content-card ${activeIndex === index ? 'opacity-100' : 'opacity-60'}`}
          style={{ transition: "opacity 0.3s ease" }}
        >
          <ContentCard item={item} />
        </div>
      ))}
    </div>
  )
}