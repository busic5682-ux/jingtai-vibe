import { Link } from "@tanstack/react-router";
import { BaseIcon, iconRegistry, type IconName } from "@/components/ui/base-icon";
import { ChevronLeft } from "lucide-react";

type Group = { title: string; subtitle?: string; items: IconName[] };

const groups: Group[] = [
  {
    title: "TabBar Icons",
    subtitle: "底部导航 — 首页 / 地图 / 发布 / 榜单 / 我的",
    items: ["home", "map", "publish", "ranking", "profile"],
  },
  {
    title: "Category Icons",
    subtitle: "首页五大分类入口",
    items: ["food", "drink", "play", "date", "service"],
  },
  {
    title: "Function Icons",
    subtitle: "通用功能",
    items: [
      "search",
      "edit",
      "settings",
      "location",
      "map-pin",
      "camera",
      "heart",
      "share",
      "back",
      "chevron-right",
      "trash",
      "phone",
      "notification",
      "shield",
      "cache",
      "info",
    ],
  },
  {
    title: "Badge Icons",
    subtitle: "我的页面成就徽章",
    items: [
      "milk-tea",
      "night-food",
      "barbecue",
      "date-master",
      "discoverer",
      "recommender",
      "local-explorer",
    ],
  },
];

function StateRow({ name }: { name: IconName }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {/* default */}
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_2px_8px_-4px_rgba(17,17,17,0.08)]">
          <BaseIcon name={name} state="default" />
        </div>
        {/* inactive */}
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_2px_8px_-4px_rgba(17,17,17,0.08)]">
          <BaseIcon name={name} state="inactive" />
        </div>
        {/* active — dark filled bg */}
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink">
          <BaseIcon name={name} state="default" className="text-white" />
        </div>
      </div>
      <code className="text-[10px] leading-none text-ink-soft">{name}</code>
    </div>
  );
}

export function IconSystemScreen() {
  return (
    <div className="h-full overflow-y-auto bg-surface pb-10">
      {/* header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-white/90 px-5 py-4 backdrop-blur">
        <Link
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"
          aria-label="返回"
        >
          <ChevronLeft className="h-5 w-5 text-ink" strokeWidth={2} />
        </Link>
        <h1 className="text-[15px] font-semibold text-ink">Icon System</h1>
        <span className="w-9" />
      </div>

      {/* spec card */}
      <div className="mx-5 mt-5 rounded-2xl bg-white p-4 shadow-[0_2px_8px_-4px_rgba(17,17,17,0.08)]">
        <p className="text-[12px] leading-5 text-ink-soft">
          Lucide 线性图标 · 24px · 2px stroke · 圆角线端 · 黑白灰为主。
          暖黄色仅用于评分与等级徽章。三态：default / inactive / active。
        </p>
        <div className="mt-3 flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink" /> default
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-soft/50" /> inactive
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink ring-2 ring-ink/10" /> active
          </span>
        </div>
      </div>

      {/* groups */}
      {groups.map((g) => (
        <section key={g.title} className="mt-6 px-5">
          <div className="mb-3">
            <h2 className="text-[14px] font-semibold text-ink">{g.title}</h2>
            {g.subtitle && (
              <p className="text-[11px] text-ink-soft">{g.subtitle}</p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 rounded-2xl bg-white p-4 shadow-[0_2px_8px_-4px_rgba(17,17,17,0.08)] sm:grid-cols-4">
            {g.items.map((n) => (
              <StateRow key={n} name={n} />
            ))}
          </div>
        </section>
      ))}

      {/* PNG export naming */}
      <section className="mt-6 px-5">
        <div className="mb-3">
          <h2 className="text-[14px] font-semibold text-ink">PNG 导出命名</h2>
          <p className="text-[11px] text-ink-soft">
            微信小程序使用 /static/icons/&lt;name&gt;.png；TabBar 需 active 版本。
          </p>
        </div>
        <pre className="overflow-x-auto rounded-2xl bg-ink p-4 text-[11px] leading-5 text-white/90">
{`# TabBar (需 active 版本)
/static/icons/home.png         /static/icons/home-active.png
/static/icons/map.png          /static/icons/map-active.png
/static/icons/publish.png      /static/icons/publish-active.png
/static/icons/ranking.png      /static/icons/ranking-active.png
/static/icons/profile.png      /static/icons/profile-active.png

# Category
${(["food", "drink", "play", "date", "service"] as const)
  .map((n) => `/static/icons/${n}.png`)
  .join("\n")}

# Function
${Object.keys(iconRegistry)
  .filter(
    (n) =>
      ![
        "home",
        "map",
        "publish",
        "ranking",
        "profile",
        "food",
        "drink",
        "play",
        "date",
        "service",
        "milk-tea",
        "night-food",
        "barbecue",
        "date-master",
        "discoverer",
        "recommender",
        "local-explorer",
      ].includes(n),
  )
  .map((n) => `/static/icons/${n}.png`)
  .join("\n")}

# Badge (已解锁深底白图 / 未解锁浅底灰图)
${(
  [
    "milk-tea",
    "night-food",
    "barbecue",
    "date-master",
    "discoverer",
    "recommender",
    "local-explorer",
  ] as const
)
  .map((n) => `/static/icons/badge-${n}.png`)
  .join("\n")}`}
        </pre>
      </section>
    </div>
  );
}
