import { cn } from "@/lib/utils";
import {
  Home,
  Map,
  Plus,
  Trophy,
  User,
  Search,
  PenLine,
  Settings,
  Locate,
  MapPin,
  Camera,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Phone,
  Bell,
  ShieldCheck,
  HardDrive,
  Info,
  UtensilsCrossed,
  Coffee,
  Gamepad2,
  Sparkles,
  Wrench,
  CupSoda,
  Moon,
  Flame,
  HeartHandshake,
  Compass,
  Megaphone,
  Footprints,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon System — single source of truth for 景泰GO.
 *
 * Style spec:
 *  - Lucide line icons, 24px / 2px stroke, round linecap
 *  - Monochrome (black/gray); warm-yellow only for ratings / badges
 *  - States: default | inactive | active
 *
 * Names match the PNG export filenames under /static/icons/<name>.png
 * (Codex 小程序端按此命名复用)。
 */
export const iconRegistry = {
  // TabBar
  home: Home,
  map: Map,
  publish: Plus,
  ranking: Trophy,
  profile: User,

  // Common functions
  search: Search,
  edit: PenLine,
  settings: Settings,
  location: Locate,
  "map-pin": MapPin,
  camera: Camera,
  heart: Heart,
  share: Share2,
  back: ChevronLeft,
  "chevron-right": ChevronRight,
  trash: Trash2,
  phone: Phone,
  notification: Bell,
  shield: ShieldCheck,
  cache: HardDrive,
  info: Info,

  // Home categories
  food: UtensilsCrossed,
  drink: Coffee,
  play: Gamepad2,
  date: Sparkles,
  service: Wrench,

  // Badges
  "milk-tea": CupSoda,
  "night-food": Moon,
  barbecue: Flame,
  "date-master": HeartHandshake,
  discoverer: Compass,
  recommender: Megaphone,
  "local-explorer": Footprints,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

// ---- legacy PNG fallback (kept so old `name` strings still render) ----
const iconUrls = import.meta.glob("/src/assets/icons/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const pngFallback: Record<string, string> = Object.fromEntries(
  Object.entries(iconUrls).map(([p, u]) => [
    p.split("/").pop()!.replace(/\.png$/, ""),
    u,
  ]),
);

// Legacy English aliases (kept minimal — Chinese aliases removed per spec)
const aliases: Record<string, IconName> = {
  discover: "map",
  rank: "ranking",
  me: "profile",
};

export type IconState = "default" | "inactive" | "active";

export type BaseIconProps = {
  name: IconName | (string & {});
  size?: 16 | 20 | 24 | 28;
  /** convenience: when provided, sets state to active|inactive */
  active?: boolean;
  state?: IconState;
  /** warm-yellow accent — only for ratings / unlocked badges */
  tone?: "default" | "warning";
  className?: string;
};

/**
 * BaseIcon — renders a Lucide line icon with unified size/stroke/state.
 * Falls back to PNG (legacy) if a name is not in the registry.
 */
export function BaseIcon({
  name,
  size = 24,
  active,
  state,
  tone = "default",
  className,
}: BaseIconProps) {
  const resolvedName = (aliases[name as string] ?? name) as IconName;
  const Cmp = iconRegistry[resolvedName];

  const resolvedState: IconState =
    state ?? (active === undefined ? "default" : active ? "active" : "inactive");

  const colorCls =
    tone === "warning"
      ? "text-[#E8A317]"
      : resolvedState === "inactive"
        ? "text-ink-soft/50"
        : "text-ink";

  const opacityCls =
    resolvedState === "inactive" ? "opacity-60" : "opacity-100";

  if (!Cmp) {
    // PNG fallback for unmigrated names
    const src = pngFallback[name as string];
    if (src) {
      return (
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          className={cn(
            "shrink-0 select-none transition-opacity",
            opacityCls,
            className,
          )}
          style={{ width: size, height: size }}
          draggable={false}
        />
      );
    }
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
    <Cmp
      size={size}
      strokeWidth={2}
      absoluteStrokeWidth
      className={cn(
        "shrink-0 transition-opacity",
        colorCls,
        opacityCls,
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}
