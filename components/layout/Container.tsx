import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        `
        mx-auto
        w-full
        max-w-screen-2xl
        px-4
        sm:px-8
        md:px-12
        lg:px-16
        xl:px-18
        `,
        className
      )}
    >
      {children}
    </div>
  );
}