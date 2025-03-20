import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, ExternalLink, BookmarkPlus } from "lucide-react"
import type { NewsItem } from "@/lib/types"

interface NewsCardProps {
  news: NewsItem
  isActive?: boolean
}

export default function NewsCard({ news, isActive = false }: NewsCardProps) {
  return (
    <Card
      className={`w-full h-full max-w-md mx-auto overflow-hidden transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
    >
      <div className="relative w-full h-[35vh]">
        <Image src={news.imageUrl || "/placeholder.svg"} alt={news.title} fill className="object-cover" priority />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16" />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{news.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {news.source} · {news.time}
        </p>
        <p className="text-sm leading-relaxed">{news.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <BookmarkPlus className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ExternalLink className="h-4 w-4" />
          <span>Read More</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

