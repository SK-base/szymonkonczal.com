import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: "default" | "thick" | "dashed" | "dotted";
  spacing?: "tight" | "normal" | "loose";
}

export function Separator({
  className,
  variant = "default",
  spacing = "normal",
  ...props
}: SeparatorProps) {
  const variantStyles = {
    default: "border-t border-border",
    thick: "border-t-2 border-accent",
    dashed: "border-t border-dashed border-border",
    dotted: "border-t border-dotted border-border",
  };

  const spacingStyles = {
    tight: "my-4",
    normal: "my-8",
    loose: "my-12",
  };

  return (
    <hr
      className={cn(
        variantStyles[variant],
        spacingStyles[spacing],
        className
      )}
      {...props}
    />
  );
}
