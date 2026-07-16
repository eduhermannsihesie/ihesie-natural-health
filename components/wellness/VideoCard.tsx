import Image from "next/image";
import { Eye, Heart, MessageSquare, Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  date: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
}

export default function VideoCard({
  title,
  thumbnail,
  date,
  duration,
  views,
  likes,
  comments,
}: VideoCardProps) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-sm
        cursor-pointer
      "
    >
      {/* Image */}

      <div className="relative aspect-4/4">

        <Image
          src={thumbnail}
          alt={title}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Dark overlay */}

        <div className="absolute inset-0 bg-black/45" />

        {/* Date */}

        <div
          className="
            absolute
            left-5
            top-5
            text-white
            text-xs
          "
        >
          {date} • {duration}
        </div>

        {/* Play Button */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-white/20
              backdrop-blur-sm
              transition
              group-hover:scale-110
            "
          >
            <Play
              fill="white"
              className="text-white ml-1"
              size={28}
            />
          </div>
        </div>

        {/* Bottom Content */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-6
            text-white
          "
        >
          <h3
            className="
              font-heading
              text-xl
              sm:text-2xl
              md:text-2xl
              lg:text-2xl
              font-semibold
              leading-tight
            "
          >
            {title}
          </h3>

          <div className="my-5 h-px bg-white/60" />

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-1">

              <Eye size={18} />

              <span className="text-sm">{views}</span>

            </div>

            <div className="flex items-center gap-1">

              <MessageSquare size={18} />

              <span className="text-sm">{comments}</span>

            </div>

            <div className="flex items-center gap-1">

              <Heart
                size={18}
                fill="currentColor"
                className="text-red-500"
              />

              <span className="text-sm">{likes}</span>

            </div>

          </div>

        </div>

      </div>

    </article>
  );
}