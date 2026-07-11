import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  previous(): void;
  next(): void;
}

export default function CarouselButtons({
  previous,
  next,
}: Props) {
  return (
    <>
      <button
        onClick={previous}
        aria-label="Previous products"
        className="
          flex items-center justify-center
          h-10 w-10
          sm:h-11 sm:w-11
          lg:h-12 lg:w-12
          rounded-full
          border
          bg-white
          shadow-md
          hover:bg-primary
          hover:text-white
          transition-all duration-300
        "
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>

      <button
        onClick={next}
        aria-label="Next products"
        className="
          flex items-center justify-center
          h-10 w-10
          sm:h-11 sm:w-11
          lg:h-12 lg:w-12
          rounded-full
          border
          bg-white
          shadow-md
          hover:bg-primary
          hover:text-white
          transition-all duration-300
        "
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
    </>
  );
}