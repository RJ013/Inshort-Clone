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
  // Ensure the image URL is properly formatted
  const imageUrl = item.imageUrl && item.imageUrl.startsWith('http') 
    ? item.imageUrl 
    : '/placeholder.svg'

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
    <div className="content-card h-full w-full max-w-6xl mx-auto px-4 py-6 flex flex-col">
      <Card className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        <div className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-full lg:w-3/5 lg:min-h-[60vh]">
          <Image 
            src={imageUrl} 
            alt={item.title} 
            fill 
            className="object-cover object-center" 
            priority 
            unoptimized={!imageUrl.startsWith('/')}
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16 lg:hidden" />
        </div>
        
        <div className="flex flex-col justify-between lg:w-2/5">
          <CardContent className="p-4 sm:p-6 lg:p-8 flex-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{item.title}</h2>
            <p className="text-sm lg:text-base text-muted-foreground mb-4">
              {item.source} · {item.time}
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-6 lg:line-clamp-none">{item.content}</p>
          </CardContent>
          
          <CardFooter className="flex justify-end p-4 pt-0 border-t lg:p-6">
            <div className="flex w-full justify-end lg:justify-between">
              <div className="hidden lg:block">
                <p className="text-sm text-muted-foreground">
                  From {item.source}
                </p>
              </div>
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
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}