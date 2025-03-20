"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, ExternalLink } from "lucide-react"
import type { NewsItem } from "@/lib/types"

interface ContentCardProps {
  item: NewsItem
}

export default function ContentCard({ item }: ContentCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.content,
          url: item.url,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(item.url)
        .then(() => alert("Link copied to clipboard!"))
        .catch((error) => console.error("Copy failed:", error))
    }
  }

  return (
    <div className="content-card h-full w-full max-w-3xl mx-auto px-4 py-2 flex flex-col">
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="relative w-full h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh]">
          <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" priority />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16" />
        </div>
        <CardContent className="p-4 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {item.source} · {item.time}
          </p>
          <p className="text-sm sm:text-base leading-relaxed overflow-hidden">{item.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end p-4 pt-0 border-t">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => window.open(item.url, "_blank")}
              aria-label="Read full article"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Read More</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}