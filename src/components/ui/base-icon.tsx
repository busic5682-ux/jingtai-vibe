import { cn } from "@/lib/utils";

// Eagerly load all PNG icons from src/assets/icons as URL strings.
const iconUrls = import.meta.glob("/src/assets/icons/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const iconMap: Record<string, string> = Object.fromEntries(
  Object.entries(iconUrls).map(([path, url]) => {
    const name = path.split("/").pop()!.replace(/\.png$/, "");
    return [name, url];
  }),
);

export type BaseIconProps = {
  name: string;
  size?: 16 | 20 | 24;
  active?: boolean;
  className?: string;
  invert?: boolean;
};

/**
 * BaseIcon — unified icon component.
 * Loads monochrome PNG from src/assets/icons.
 * `active` controls opacity; `invert` flips black ↔ white (use on dark surfaces).
 */
export function BaseIcon({
  name,
  size = 24,
  active = true,
  className,
  invert = false,
}: BaseIconProps) {
  const src = iconMap[name];
  if (!src) {
    // Soft-fail placeholder: dotted square, never a generic gray dot.
    return (
      <span
        aria-hidden
        className={cn(
          "inline-block rounded border border-dashed border-ink-soft/40",
          className,
        )}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className={cn(
        "shrink-0 select-none transition-opacity",
        active ? "opacity-100" : "opacity-40",
        invert && "invert",
        className,
      )}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}
