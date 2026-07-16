"use client";

import { Search } from "lucide-react";

interface Props {
  activeTab: "videos" | "articles";
  onTabChange: (tab: "videos" | "articles") => void;
  search: string;
  onSearch: (value: string) => void;
}

export default function WellnessToolbar({
  activeTab,
  onTabChange,
  search,
  onSearch,
}: Props) {
  return (
    <section className="py-12 px-12 lg:px-20">
        

      <div className="flex gap-4 flex-col sm:flex-row md:flex-row lg:flex-row ">

        <div className="flex rounded-md w-38 border border-border overflow-hidden">

          <button
            onClick={() => onTabChange("videos")}
            className={`px-4 py-1 text-sm transition

              ${
                activeTab === "videos"
                  ? "bg-primary-hover text-white"
                  : "hover:text-white hover:bg-primary-hover "
              }
            `}
          >
            Videos
          </button>

          <button
            onClick={() => onTabChange("articles")}
            className={`px-4 py-1 text-sm transition

              ${
                activeTab === "articles"
                  ? "bg-primary-hover text-white"
                  : "hover:text-white hover:bg-primary-hover"
              }
            `}
          >
            Articles
          </button>

        </div>

        <form 
             onSubmit={(e)=>e.preventDefault()}
             className="flex w-full max-w-sm">

          <input
            value={search}
            onChange={(e)=>onSearch(e.target.value)}
             placeholder={
                  activeTab==="videos"
                   ? "Search videos..."
                   : "Search articles..."
               }
            className="flex-1 border rounded-l-md border-border px-4 py-2 text-sm"
          />

          <button
            className="flex w-12 items-center justify-center rounded-r-md bg-primary-hover text-white"
          >
            <Search size={18}/>
          </button>

        </form>

      </div>
    

    </section>
  );
}