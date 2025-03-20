"use client"

import { useRef, useEffect, useMemo } from "react"
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
    if (!container) return

    // Intersection Observer to handle visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            entry.target.classList.add("active")
          } else {
            entry.target.classList.remove("active")
          }
        })
      },
      {
        root: container,
        threshold: 0.5,
        rootMargin: "0px",
      }
    )

    const cards = container.querySelectorAll(".content-card")
    cards.forEach((card) => observer.observe(card))

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [sortedItems])

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx global>{`
        .feed-container::-webkit-scrollbar {
          display: none;
        }
        
        .content-card {
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        
        .content-card.active {
          opacity: 1;
        }
      `}</style>

      {sortedItems.map((item) => (
        <div key={item.title} className="snap-start h-full w-full">
          <ContentCard item={item} />
        </div>
      ))}
    </div>
  )
}
