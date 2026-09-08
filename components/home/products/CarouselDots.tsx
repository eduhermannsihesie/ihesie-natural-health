"use client";

interface Props {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function CarouselDots({
  count,
  current,
  onSelect,
}: Props) {
  return (
    <div className="mt-15 flex justify-center gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`h-3 w-3 rounded-full transition-all duration-300 ${
            index === current
              ? "bg-primary scale-110"
              : "bg-gray-300 hover:bg-primary/60"
          }`}
        />
      ))}
    </div>
  );
}