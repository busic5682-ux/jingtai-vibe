import {
  Bell,
  Search,
  UtensilsCrossed,
  Coffee,
  Gamepad2,
  Heart,
  Sparkles,
  ChevronRight,
  Home,
  Compass,
  Plus,
  Trophy,
  User,
  MapPin,
  Navigation,
  Share2,
  Bookmark,
  Image as ImageIcon,
  Star,
  Camera,
  Send,
  Crown,
  Award,
  Settings,
  Footprints,
  MessageSquare,
  PenLine,
  Flame,
  ChevronLeft,
  Layers,
  Locate,
} from "lucide-react";

import hotpot from "@/assets/place-hotpot.jpg";
import milktea from "@/assets/place-milktea.jpg";
import cafe from "@/assets/place-cafe.jpg";
import bbq from "@/assets/place-bbq.jpg";
import restaurant from "@/assets/place-restaurant.jpg";
import avatar from "@/assets/avatar.jpg";

// ---------- shared bits ----------

function TabBar({ active }: { active: "home" | "discover" | "post" | "rank" | "me" }) {
  const item = (
    key: typeof active,
    Icon: typeof Home,
    label: string,
  ) => {
    const on = active === key;
    return (
      <button
        key={key}
        className="flex flex-1 flex-col items-center justify-center gap-1"
      >
        <Icon
          className={`h-5 w-5 ${on ? "text-ink" : "text-ink-soft/60"}`}
          strokeWidth={on ? 2.2 : 1.7}
        />
        <span
          className={`text-[10px] ${on ? "font-semibold text-ink" : "text-ink-soft/70"}`}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="absolute inset-x-4 bottom-4 z-40">
      <div className="relative flex items-center rounded-[28px] border border-white/60 bg-white/85 px-2 py-2 shadow-[0_8px_30px_-12px_rgba(17,17,17,0.18)] backdrop-blur-xl">
        {item("home", Home, "首页")}
        {item("discover", Compass, "发现")}
        <button className="-mt-7 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-ink shadow-[0_10px_24px_-6px_rgba(79,140,255,0.45)] ring-4 ring-white">
          <Plus className="h-6 w-6 text-white" strokeWidth={2.4} />
        </button>
        {item("rank", Trophy, "榜单")}
        {item("me", User, "我的")}
      </div>
    </div>
  );
}

function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "brand" | "highlight" | "dark";
}) {
  const tones = {
    default: "bg-white/85 text-ink border border-black/5",
    brand: "bg-brand-soft text-brand",
    highlight: "bg-[#FFF3DD] text-[#B7791F]",
    dark: "bg-ink text-white",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold text-white">
      <Sparkles className="h-3 w-3 text-highlight" strokeWidth={2.4} />
      {score.toFixed(1)}
    </div>
  );
}

// ---------- 1. HOME ----------

export function HomeScreen() {
  const cats = [
    { icon: UtensilsCrossed, label: "吃什么", color: "#FFE9D6" },
    { icon: Coffee, label: "喝什么", color: "#E6F0FF" },
    { icon: Gamepad2, label: "玩什么", color: "#EAFBE7" },
    { icon: Heart, label: "约会去哪", color: "#FFE4EC" },
    { icon: Sparkles, label: "服务体验", color: "#F2E9FF" },
  ];
  const hot = [
    { img: hotpot, name: "巷子里的麻辣火锅", tag: "火锅·川味", score: 9.4, dist: "0.8km", users: 1284 },
    { img: milktea, name: "白月光手作茶饮", tag: "奶茶·新品", score: 9.1, dist: "1.2km", users: 862 },
    { img: cafe, name: "晨光咖啡 Daybreak", tag: "咖啡·安静", score: 8.9, dist: "0.5km", users: 540 },
  ];
  return (
    <div className="h-full overflow-y-auto bg-surface pb-32">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink">
                <span className="text-[12px] font-black text-white">GO</span>
              </div>
              <div>
                <p className="text-[15px] font-bold leading-tight text-ink">景泰GO</p>
                <p className="flex items-center gap-1 text-[10px] text-ink-soft">
                  <MapPin className="h-2.5 w-2.5" /> 景泰县 · 一条街
                </p>
              </div>
            </div>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell className="h-4 w-4 text-ink" strokeWidth={1.8} />
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_2px_8px_-4px_rgba(17,17,17,0.08)]">
          <Search className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
          <span className="text-[13px] text-ink-soft">搜索餐厅、奶茶、KTV…</span>
        </div>
      </div>

      {/* Quick categories */}
      <div className="grid grid-cols-5 gap-1 px-3 pt-2">
        {cats.map((c) => (
          <button key={c.label} className="flex flex-col items-center gap-1.5 py-2">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: c.color }}
            >
              <c.icon className="h-5 w-5 text-ink" strokeWidth={1.8} />
            </div>
            <span className="text-[11px] font-medium text-ink">{c.label}</span>
          </button>
        ))}
      </div>

      {/* Today's hot */}
      <div className="mt-5 flex items-center justify-between px-5">
        <div>
          <h2 className="text-[18px] font-bold text-ink">今日热门</h2>
          <p className="text-[11px] text-ink-soft">景泰人正在去的地方</p>
        </div>
        <button className="flex items-center text-[12px] font-medium text-ink-soft">
          查看更多 <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
        {hot.map((p) => (
          <div
            key={p.name}
            className="w-[220px] shrink-0 overflow-hidden rounded-[24px] bg-white shadow-[0_4px_14px_-8px_rgba(17,17,17,0.15)]"
          >
            <div className="relative h-[140px] w-full">
              <img
                src={p.img}
                alt={p.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute left-3 top-3">
                <ScoreBadge score={p.score} />
              </div>
              <button className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 backdrop-blur">
                <Heart className="h-3.5 w-3.5 text-ink" strokeWidth={1.8} />
              </button>
            </div>
            <div className="p-3">
              <p className="truncate text-[13px] font-semibold text-ink">{p.name}</p>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-ink-soft">
                <span>{p.tag}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-ink-soft/50" />
                <span>{p.dist}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-ink-soft/50" />
                <span>{p.users.toLocaleString()}人去过</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section: 本周推荐 */}
      <div className="mt-6 px-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-ink">本周推荐</h2>
            <p className="text-[11px] text-ink-soft">年轻人正在偷偷收藏</p>
          </div>
          <Pill tone="highlight">
            <Flame className="h-3 w-3" /> Hot
          </Pill>
        </div>

        <div className="mt-3 overflow-hidden rounded-[24px] bg-white shadow-[0_4px_14px_-8px_rgba(17,17,17,0.15)]">
          <div className="relative h-[170px]">
            <img src={bbq} alt="夜宵" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0" />
            <div className="absolute inset-x-4 bottom-3 text-white">
              <div className="flex items-center gap-2">
                <Pill tone="dark">夜宵 · 烧烤</Pill>
                <ScoreBadge score={9.6} />
              </div>
              <p className="mt-2 text-[16px] font-bold">老王烧烤 · 北街口</p>
              <p className="mt-0.5 text-[11px] opacity-90">
                凌晨两点还排队 · 1.4km · 2.1k 人去过
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: 附近热门 list */}
      <div className="mt-6 px-5">
        <h2 className="text-[18px] font-bold text-ink">附近热门</h2>
        <div className="mt-3 space-y-3">
          {[
            { img: restaurant, name: "山间小院 · 私房菜", tag: "聚会·中餐", score: 9.0, dist: "1.6km" },
            { img: cafe, name: "白桦林咖啡", tag: "约会·咖啡", score: 8.8, dist: "0.9km" },
          ].map((p) => (
            <div
              key={p.name}
              className="flex gap-3 overflow-hidden rounded-[20px] bg-white p-2 shadow-[0_2px_10px_-6px_rgba(17,17,17,0.12)]"
            >
              <img
                src={p.img}
                alt=""
                className="h-[78px] w-[78px] shrink-0 rounded-2xl object-cover"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col justify-center pr-2">
                <p className="text-[14px] font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-[11px] text-ink-soft">{p.tag} · {p.dist}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <ScoreBadge score={p.score} />
                  <Pill>环境舒服</Pill>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
}

// ---------- 2. DISCOVER (MAP) ----------

export function DiscoverScreen() {
  const filters = ["全部", "餐饮", "奶茶", "娱乐", "约会", "服务"];
  // pin positions
  const pins = [
    { x: 24, y: 28, score: 9.4, hi: true },
    { x: 62, y: 22, score: 8.9 },
    { x: 48, y: 44, score: 9.1 },
    { x: 32, y: 58, score: 8.6 },
    { x: 70, y: 56, score: 9.0 },
    { x: 58, y: 70, score: 8.7 },
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#eef2f6]">
      {/* Map stylized */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 360 760" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mapbg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#eef2f7" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <rect width="360" height="760" fill="url(#mapbg)" />
          {/* parks */}
          <path d="M0 480 Q120 440 240 500 T360 470 L360 600 L0 620 Z" fill="#d6ead8" opacity="0.7" />
          <circle cx="280" cy="180" r="80" fill="#d6ead8" opacity="0.6" />
          {/* water */}
          <path d="M0 250 Q90 230 180 260 T360 240 L360 320 Q220 340 110 320 T0 340 Z" fill="#cfe1f3" opacity="0.75" />
          {/* roads */}
          {[120, 220, 320, 420, 520, 620].map((y) => (
            <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#fff" strokeWidth="6" opacity="0.85" />
          ))}
          {[60, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="760" stroke="#fff" strokeWidth="5" opacity="0.85" />
          ))}
          {/* thin roads */}
          {[80, 180, 280, 380, 480, 580, 680].map((y) => (
            <line key={`t${y}`} x1="0" y1={y} x2="360" y2={y} stroke="#fff" strokeWidth="2" opacity="0.6" />
          ))}
        </svg>
      </div>

      {/* Top search */}
      <div className="absolute inset-x-4 top-12 z-30">
        <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_8px_24px_-12px_rgba(17,17,17,0.2)] backdrop-blur-xl">
          <Search className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
          <span className="flex-1 text-[13px] text-ink-soft">在景泰县发现…</span>
          <div className="h-5 w-px bg-black/10" />
          <Layers className="h-4 w-4 text-ink" strokeWidth={1.8} />
        </div>
        {/* Filter chips */}
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium shadow-sm ${
                i === 0
                  ? "bg-ink text-white"
                  : "border border-white/60 bg-white/90 text-ink backdrop-blur"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Pins */}
      {pins.map((p, i) => (
        <div
          key={i}
          className="absolute z-20"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold shadow-[0_6px_14px_-6px_rgba(17,17,17,0.4)] ${
              p.hi ? "bg-ink text-white" : "bg-white text-ink"
            }`}
          >
            <Sparkles
              className={`h-3 w-3 ${p.hi ? "text-highlight" : "text-brand"}`}
              strokeWidth={2.4}
            />
            {p.score.toFixed(1)}
          </div>
          <div
            className={`mx-auto -mt-0.5 h-2 w-2 rotate-45 ${
              p.hi ? "bg-ink" : "bg-white"
            }`}
          />
        </div>
      ))}

      {/* Locate button */}
      <button className="absolute right-4 top-[260px] z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_-10px_rgba(17,17,17,0.25)]">
        <Locate className="h-4 w-4 text-brand" strokeWidth={2} />
      </button>

      {/* Bottom place card */}
      <div className="absolute inset-x-4 bottom-28 z-30">
        <div className="flex gap-3 overflow-hidden rounded-[24px] border border-white/70 bg-white/95 p-3 shadow-[0_16px_40px_-16px_rgba(17,17,17,0.25)] backdrop-blur-xl">
          <img
            src={hotpot}
            alt=""
            className="h-[88px] w-[88px] shrink-0 rounded-2xl object-cover"
            loading="lazy"
          />
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between">
              <p className="text-[14px] font-bold text-ink">巷子里的麻辣火锅</p>
              <ScoreBadge score={9.4} />
            </div>
            <p className="mt-0.5 text-[11px] text-ink-soft">火锅 · 川味 · 0.8km</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              <Pill>适合聚会</Pill>
              <Pill>性价比高</Pill>
            </div>
            <button className="mt-2 flex items-center justify-center gap-1 rounded-xl bg-ink py-1.5 text-[12px] font-semibold text-white">
              进入详情 <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <TabBar active="discover" />
    </div>
  );
}

// ---------- 3. DETAIL ----------

export function DetailScreen() {
  const tags = ["环境舒服", "适合约会", "老板热情", "停车方便", "性价比高", "出餐快"];
  const reviews = [
    {
      name: "小满",
      text: "灯光氛围超棒，第一次约会选这里加分！",
      tag: "适合约会",
    },
    {
      name: "Leo",
      text: "锅底味道正，朋友聚会来过三次了。",
      tag: "适合聚会",
    },
  ];

  return (
    <div className="relative h-full overflow-y-auto bg-white pb-32">
      {/* Cover */}
      <div className="relative h-[320px] w-full">
        <img src={restaurant} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

        {/* Top actions */}
        <div className="absolute inset-x-4 top-12 flex items-center justify-between">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur">
            <ChevronLeft className="h-4 w-4 text-ink" strokeWidth={2} />
          </button>
          <div className="flex gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur">
              <Share2 className="h-4 w-4 text-ink" strokeWidth={1.8} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur">
              <Heart className="h-4 w-4 text-ink" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="absolute inset-x-5 bottom-5 text-white">
          <div className="flex items-center gap-2">
            <Pill tone="dark">私房菜</Pill>
            <Pill tone="dark">约会推荐</Pill>
          </div>
          <h1 className="mt-2 text-[24px] font-bold leading-tight">山间小院 · 私房菜</h1>
          <div className="mt-1 flex items-center gap-3 text-[11px] opacity-90">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> 一条街 38 号 · 1.6km
            </span>
          </div>
        </div>
      </div>

      {/* Score row */}
      <div className="mx-4 -mt-6 rounded-[24px] border border-black/5 bg-white p-4 shadow-[0_10px_30px_-18px_rgba(17,17,17,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-black text-ink leading-none">9.2</span>
              <span className="text-[11px] text-ink-soft">推荐指数</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-soft">基于 312 位景泰人体验</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[avatar, milktea, cafe].map((s, i) => (
                <img
                  key={i}
                  src={s}
                  className="h-7 w-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="text-[11px] text-ink-soft">312 人去过</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Pill key={t} tone="brand">
              {t}
            </Pill>
          ))}
        </div>
      </div>

      {/* Photo wall */}
      <div className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-ink">现场图片</h3>
          <span className="text-[11px] text-ink-soft">共 86 张</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[hotpot, milktea, cafe, bbq, restaurant, hotpot].map((s, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl">
              <img src={s} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-6 px-5">
        <h3 className="text-[15px] font-bold text-ink">用户体验</h3>
        <div className="mt-3 space-y-2.5">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl bg-surface p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
                    {r.name[0]}
                  </div>
                  <span className="text-[12px] font-semibold text-ink">{r.name}</span>
                </div>
                <Pill tone="brand">{r.tag}</Pill>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-ink">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related */}
      <div className="mt-6 px-5">
        <h3 className="text-[15px] font-bold text-ink">相关推荐</h3>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {[cafe, milktea, bbq].map((s, i) => (
            <div key={i} className="w-32 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm">
              <img src={s} className="h-20 w-full object-cover" loading="lazy" />
              <div className="p-2">
                <p className="truncate text-[11px] font-semibold text-ink">推荐去处 {i + 1}</p>
                <p className="text-[10px] text-ink-soft">1.{i + 2}km</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="absolute inset-x-4 bottom-4 z-40 flex items-center gap-2 rounded-[24px] border border-white/70 bg-white/95 p-2 shadow-[0_16px_40px_-16px_rgba(17,17,17,0.25)] backdrop-blur-xl">
        <button className="flex flex-1 flex-col items-center py-1">
          <Bookmark className="h-4 w-4 text-ink" strokeWidth={1.8} />
          <span className="mt-0.5 text-[10px] text-ink">想去</span>
        </button>
        <button className="flex flex-1 flex-col items-center py-1">
          <Navigation className="h-4 w-4 text-ink" strokeWidth={1.8} />
          <span className="mt-0.5 text-[10px] text-ink">导航</span>
        </button>
        <button className="ml-1 flex flex-[2] items-center justify-center gap-1 rounded-2xl bg-ink py-3 text-[13px] font-semibold text-white">
          <PenLine className="h-4 w-4" /> 写体验
        </button>
      </div>
    </div>
  );
}

// ---------- 4. POST ----------

export function PostScreen() {
  const tags = [
    "环境舒服",
    "适合约会",
    "性价比高",
    "老板热情",
    "出餐快",
    "适合聚会",
    "拍照好看",
    "氛围感",
  ];
  return (
    <div className="relative h-full overflow-y-auto bg-white pb-32">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3">
        <button>
          <ChevronLeft className="h-5 w-5 text-ink" strokeWidth={2} />
        </button>
        <p className="text-[15px] font-bold text-ink">发布体验</p>
        <button className="text-[12px] font-medium text-ink-soft">草稿</button>
      </div>

      {/* Image upload */}
      <div className="px-5">
        <div className="grid grid-cols-3 gap-2">
          {[hotpot, milktea, cafe].map((s, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-2xl">
              <img src={s} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
          <button className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-ink/15 bg-surface">
            <Camera className="h-5 w-5 text-ink-soft" strokeWidth={1.6} />
            <span className="text-[10px] text-ink-soft">3 / 9</span>
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="mx-5 mt-5 flex items-center gap-3 rounded-2xl bg-surface p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft">
          <MapPin className="h-4 w-4 text-brand" strokeWidth={1.8} />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-ink">巷子里的麻辣火锅</p>
          <p className="text-[10px] text-ink-soft">景泰县 · 一条街 12 号</p>
        </div>
        <ChevronRight className="h-4 w-4 text-ink-soft" />
      </div>

      {/* Score */}
      <div className="mx-5 mt-3 rounded-2xl bg-surface p-3">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink">推荐指数</p>
          <p className="text-[20px] font-black text-ink">9.0</p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < 9 ? "bg-ink" : "bg-ink/10"}`}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-ink-soft">
          <span>不太行</span>
          <span>必去</span>
        </div>
      </div>

      {/* Tag chips */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink">体验标签</p>
          <span className="text-[10px] text-ink-soft">已选 3</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t, i) => {
            const on = [0, 1, 4].includes(i);
            return (
              <span
                key={t}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${
                  on
                    ? "bg-ink text-white"
                    : "border border-black/10 bg-white text-ink"
                }`}
              >
                {t}
              </span>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pt-5">
        <p className="text-[13px] font-semibold text-ink">一句话体验</p>
        <div className="mt-2 rounded-2xl bg-surface p-3">
          <p className="text-[13px] leading-relaxed text-ink">
            灯光氛围满分，朋友聚会再合适不过，出餐速度也很快。
          </p>
          <div className="mt-2 flex items-center justify-end">
            <span className="text-[10px] text-ink-soft">42 / 100</span>
          </div>
        </div>
      </div>

      {/* Publish button */}
      <div className="absolute inset-x-4 bottom-6 z-40">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-4 text-[14px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(17,17,17,0.45)]">
          <Send className="h-4 w-4" /> 发布到景泰GO
        </button>
      </div>
    </div>
  );
}

// ---------- 5. RANK ----------

export function RankScreen() {
  const cats = ["烧烤", "奶茶", "火锅", "夜宵", "约会", "咖啡馆", "理发", "摄影"];
  const list = [
    { rank: 1, img: bbq, name: "老王烧烤 · 北街口", score: 9.6, users: 2104, tag: "夜宵之王" },
    { rank: 2, img: hotpot, name: "巷子里的麻辣火锅", score: 9.4, users: 1284, tag: "聚会首选" },
    { rank: 3, img: milktea, name: "白月光手作茶饮", score: 9.1, users: 862, tag: "网红新店" },
    { rank: 4, img: cafe, name: "晨光咖啡 Daybreak", score: 8.9, users: 540, tag: "安静角落" },
    { rank: 5, img: restaurant, name: "山间小院 · 私房菜", score: 8.7, users: 410, tag: "约会高分" },
  ];
  const medal = ["#FFD56B", "#D9D9D9", "#E8A372"];

  return (
    <div className="relative h-full overflow-y-auto bg-surface pb-32">
      {/* Hero */}
      <div className="relative overflow-hidden bg-ink px-5 pt-12 pb-8 text-white">
        <div className="absolute -right-10 -top-8 h-44 w-44 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-highlight/10 blur-3xl" />
        <div className="relative">
          <Pill tone="highlight">
            <Crown className="h-3 w-3" /> 景泰榜单 · 本周
          </Pill>
          <h1 className="mt-3 text-[26px] font-black leading-tight">
            景泰人都在<br />去这些地方 →
          </h1>
          <p className="mt-2 text-[12px] text-white/70">
            年轻人真实推荐 · 每周日 20:00 更新
          </p>
        </div>
      </div>

      {/* Category chips */}
      <div className="no-scrollbar -mt-4 flex gap-2 overflow-x-auto px-5 pb-2">
        {cats.map((c, i) => (
          <button
            key={c}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-medium ${
              i === 0
                ? "bg-white text-ink shadow-[0_8px_20px_-10px_rgba(17,17,17,0.3)]"
                : "bg-white/70 text-ink"
            }`}
          >
            {c}TOP10
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 pt-3">
        {list.map((p) => (
          <div
            key={p.rank}
            className="mb-2.5 flex items-center gap-3 rounded-[20px] bg-white p-2.5 shadow-[0_2px_10px_-6px_rgba(17,17,17,0.1)]"
          >
            <div
              className="flex h-12 w-8 flex-col items-center justify-center"
            >
              <span
                className="text-[22px] font-black leading-none"
                style={{
                  color: p.rank <= 3 ? medal[p.rank - 1] : "#111",
                }}
              >
                {String(p.rank).padStart(2, "0")}
              </span>
            </div>
            <div className="relative">
              <img
                src={p.img}
                className="h-[68px] w-[68px] rounded-2xl object-cover"
                loading="lazy"
              />
              {p.rank === 1 && (
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-highlight">
                  <Crown className="h-3 w-3 text-ink" strokeWidth={2.4} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-ink">{p.name}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <ScoreBadge score={p.score} />
                <Pill tone="highlight">{p.tag}</Pill>
              </div>
              <p className="mt-1 text-[10px] text-ink-soft">
                {p.users.toLocaleString()} 位景泰人去过
              </p>
            </div>
          </div>
        ))}
      </div>

      <TabBar active="rank" />
    </div>
  );
}

// ---------- 6. ME ----------

export function MeScreen() {
  const badges = [
    { icon: Coffee, label: "奶茶达人", on: true },
    { icon: Flame, label: "夜宵达人", on: true },
    { icon: Heart, label: "约会达人", on: true },
    { icon: UtensilsCrossed, label: "烧烤达人", on: false },
    { icon: Sparkles, label: "发现官", on: false },
    { icon: Award, label: "推荐官", on: false },
  ];

  const menu = [
    { icon: Heart, label: "我的收藏", sub: "想去 12 · 去过 38 · 最爱 6" },
    { icon: PenLine, label: "我的发布", sub: "已发布 24 篇体验" },
    { icon: Footprints, label: "我的足迹", sub: "走过景泰 47 个地方" },
    { icon: Award, label: "我的徽章", sub: "已点亮 3 / 7" },
    { icon: MessageSquare, label: "意见反馈" },
    { icon: Settings, label: "设置" },
  ];

  return (
    <div className="relative h-full overflow-y-auto bg-surface pb-32">
      {/* Header */}
      <div className="relative overflow-hidden bg-ink pt-12 pb-16 text-white">
        <div className="absolute -right-12 top-6 h-40 w-40 rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute -left-10 -bottom-8 h-40 w-40 rounded-full bg-highlight/20 blur-3xl" />
        <div className="relative flex items-center gap-4 px-5">
          <div className="relative">
            <img
              src={avatar}
              alt=""
              className="h-16 w-16 rounded-2xl border-2 border-white/20 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 rounded-full bg-highlight px-1.5 py-0.5 text-[9px] font-bold text-ink">
              Lv.3
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[18px] font-bold">小满 Mantou</p>
            <p className="mt-0.5 text-[11px] text-white/70">宝藏猎人 · 走过 47 个地方</p>
            <p className="mt-1 text-[10px] text-white/60">"晚上九点的烧烤摊最好吃。"</p>
          </div>
          <button className="rounded-full border border-white/20 px-3 py-1.5 text-[11px]">
            编辑
          </button>
        </div>

        {/* Stats */}
        <div className="relative mx-5 mt-5 grid grid-cols-3 overflow-hidden rounded-2xl bg-white/10 p-3 backdrop-blur">
          {[
            { n: 47, l: "去过" },
            { n: 24, l: "发布" },
            { n: 168, l: "被收藏" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-[18px] font-black">{s.n}</p>
              <p className="text-[10px] text-white/70">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Level progress floating card */}
      <div className="mx-4 -mt-10 rounded-[24px] bg-white p-4 shadow-[0_10px_30px_-18px_rgba(17,17,17,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-ink-soft">距离 Lv.4 本地达人</p>
            <p className="mt-0.5 text-[14px] font-bold text-ink">还差 12 次体验</p>
          </div>
          <Pill tone="brand">
            <Crown className="h-3 w-3" /> Lv.3 宝藏猎人
          </Pill>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface">
          <div className="h-full w-[68%] rounded-full bg-ink" />
        </div>
      </div>

      {/* Badges */}
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-bold text-ink">我的徽章</p>
          <span className="text-[11px] text-ink-soft">3 / 7</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div
              key={b.label}
              className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 ${
                b.on ? "bg-white" : "bg-white/60"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                  b.on ? "bg-ink text-white" : "bg-surface text-ink-soft/50"
                }`}
              >
                <b.icon className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <span
                className={`text-[11px] font-medium ${
                  b.on ? "text-ink" : "text-ink-soft/60"
                }`}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="mx-4 mt-5 overflow-hidden rounded-[24px] bg-white">
        {menu.map((m, i) => (
          <div
            key={m.label}
            className={`flex items-center gap-3 px-4 py-3.5 ${
              i !== menu.length - 1 ? "border-b border-black/5" : ""
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface">
              <m.icon className="h-4 w-4 text-ink" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-ink">{m.label}</p>
              {m.sub && (
                <p className="mt-0.5 text-[10px] text-ink-soft">{m.sub}</p>
              )}
            </div>
            <ChevronRight className="h-4 w-4 text-ink-soft/60" />
          </div>
        ))}
      </div>

      <TabBar active="me" />
    </div>
  );
}
