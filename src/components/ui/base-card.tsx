import * as React from "react";
import { cn } from "@/lib/utils";

type Radius = "md" | "lg" | "xl";
type Shadow = "none" | "sm" | "md";
type Padding = "none" | "sm" | "md";

const radiusCls: Record<Radius, string> = {
  md: "rounded-xl",        // 12
  lg: "rounded-2xl",       // 16
  xl: "rounded-[20px]",    // 20
};

const shadowCls: Record<Shadow, string> = {
  none: "",
  sm: "shadow-[0_2px_8px_-4px_rgba(17,17,17,0.08)]",
  md: "shadow-[0_8px_24px_-12px_rgba(17,17,17,0.18)]",
};

const paddingCls: Record<Padding, string> = {
  none: "",
  sm: "p-3",   // 12
  md: "p-4",   // 16
};

export interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: Radius;
  shadow?: Shadow;
  padding?: Padding;
  bordered?: boolean;
  surface?: "white" | "muted";
}

export const BaseCard = React.forwardRef<HTMLDivElement, BaseCardProps>(
  (
    {
      radius = "lg",
      shadow = "sm",
      padding = "md",
      bordered = false,
      surface = "white",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          surface === "white" ? "bg-white" : "bg-surface",
          radiusCls[radius],
          shadowCls[shadow],
          paddingCls[padding],
          bordered && "border border-black/5",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
BaseCard.displayName = "BaseCard";
