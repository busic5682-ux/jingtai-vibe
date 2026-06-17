import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const variantCls: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-[0_8px_20px_-10px_rgba(17,17,17,0.45)] hover:bg-ink/90",
  secondary:
    "bg-surface text-ink hover:bg-surface/70 border border-black/5",
  danger:
    "bg-destructive text-white hover:bg-destructive/90",
  ghost:
    "bg-transparent text-ink hover:bg-surface",
};

const sizeCls: Record<Size, string> = {
  sm: "h-9 px-4 text-[12px] rounded-xl",
  md: "h-11 px-5 text-[13px] rounded-2xl",
  lg: "h-12 px-6 text-[14px] rounded-2xl",
};

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    { variant = "primary", size = "md", block, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold",
          "transition-transform duration-150 active:scale-[0.98]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantCls[variant],
          sizeCls[size],
          block && "w-full",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
BaseButton.displayName = "BaseButton";
