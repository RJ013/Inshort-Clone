"use client"

import { useState } from "react"
import FeedView from "@/components/feed-view"
import { newsData, blogsData } from "@/lib/data"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function Home() {
  const [activeTab, setActiveTab] = useState("news")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative w-full h-[100dvh] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">inshort</h1>
          </div>
          <Tabs defaultValue="news" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="news">All News</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="pt-[104px] h-full">
          {activeTab === "news" ? <FeedView items={newsData} /> : <FeedView items={blogsData} />}
        </div>
      </div>
    </main>
  )
}

