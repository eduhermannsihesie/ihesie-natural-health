import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function Heading({
  children,
  className,
}: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-heading text-4xl font-bold text-foreground",
        className
      )}
    >
      {children}
    </h2>
  );
}