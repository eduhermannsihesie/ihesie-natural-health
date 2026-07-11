import { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-300",
  {
    variants: {
      variant: {
        primary:
          "bg-primary cursor-pointer font-semibold text-white hover:bg-primary-50 hover:text-primary border-2 rounded-md border-primary hover:border-primary-hover",
        secondary:
          "bg-secondary cursor-pointer font-semibold text-white hover:bg-secondary-hover hover:text-secondary border-2 rounded-md border-secondary hover:border-secondary",
        outline:
          "border cursor-pointer rounded-md border-primary text-primary hover:bg-primary hover:text-white",
      },

      size: {
        sm: "h-9 px-6",
        md: "h-11 px-8",
        lg: "h-11 px-10",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    />
  );
}