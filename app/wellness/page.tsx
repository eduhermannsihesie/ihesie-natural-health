"use client";

import { useMemo, useState } from "react";
import WellnessHero from "@/components/wellness/WellnessHero";
import WellnessToolbar from "@/components/wellness/WellnessToolbar";
import VideoGrid from "@/components/wellness/VideoGrid";
import ArticleGrid from "@/components/wellness/ArticleGrid";

import { videos } from "@/constants/videos";
import { articles } from "@/constants/articles";


export default function WellnessPage() {
  const [activeTab, setActiveTab] = useState<"videos" | "articles">("videos");
  const [visibleVideos, setVisibleVideos] = useState(6);
  const [visibleArticles, setVisibleArticles] = useState(6);

  const [search, setSearch] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const searchTerm = search.toLowerCase();

      return (
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm)
      );
    });
  }, [search]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const searchTerm = search.toLowerCase();

      return (
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm)

      );
    });
  }, [search]);

  return (
    <>
      <WellnessHero />

      <WellnessToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearch={setSearch}
      />

      {activeTab === "videos" ? (
        <VideoGrid 
           videos={filteredVideos.slice(0, visibleVideos)}
           hasMore={visibleVideos < filteredVideos.length}
           onLoadMore={() => setVisibleVideos((prev) => prev + 6)}
           
        />
      ) : (
        <ArticleGrid 
           articles={filteredArticles.slice(0, visibleArticles)}
           hasMore={visibleArticles < filteredArticles.length}
           onLoadMore={() => setVisibleArticles((prev) => prev + 6)}
        />
      )}
    </>
  );
}