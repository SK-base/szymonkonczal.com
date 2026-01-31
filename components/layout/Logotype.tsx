import { cn } from "@/lib/utils";

const INITIALS = "SK";

interface LogotypeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Logotype({ className, size = "md" }: LogotypeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-serif font-bold",
        "bg-black text-white dark:bg-white dark:text-[#292727]",
        "ring-1 ring-border dark:ring-border",
        "hover:animate-[logo-flip_1.7s_ease-in-out]",
        sizeClasses[size],
        textSizeClasses[size],
        className
      )}
      aria-hidden
    >
      {INITIALS}
    </span>
  );
}
