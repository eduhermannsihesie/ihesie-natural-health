import Container from "@/components/layout/Container";
import VideoCard from "./VideoCard";
interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  duration: string;
  views: number;
  comments: number;
  likes: number;
}

interface VideoGridProps {
  videos: Video[];
  hasMore: boolean;
  onLoadMore: () => void
}



export default function VideoGrid({
  videos,
  hasMore,
  onLoadMore,
}: VideoGridProps ) {
  return (
    <section className="pt-10 px-8 sm:px-0 lg:px-0">

      <Container>

         {/* Empty State */}
        {videos.length === 0 ? (
          <div className="py-24 text-center">

            <h3 className="font-heading text-2xl">
              No videos found
            </h3>

            <p className="mt-2 text-muted">
              Try another search term.
            </p>

          </div>
        ) : (

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {videos.map(video=>(
            <VideoCard
              key={video.id}
              {...video}
            />
          ))}

        </div>
        )}
       

       {hasMore && (
  <div className="mt-16 flex justify-center">
    <button
      onClick={onLoadMore}
      className="
        rounded-md
        border
        border-primary
        px-8
        py-3
        text-sm
        font-medium
        text-primary
        transition
        hover:bg-primary
        hover:text-white
      "
    >
      View More
    </button>
  </div>
)}


        
      </Container>

    </section>
  );
}