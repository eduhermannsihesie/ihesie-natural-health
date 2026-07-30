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
        px-6
        sm:px-14
        lg:px-18
        `,
        className
      )}
    >
      {children}
    </div>
  );
}