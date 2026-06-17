import { Link } from "@tanstack/react-router";
import { BaseIcon, type IconName } from "@/components/ui/base-icon";
import { ChevronLeft } from "lucide-react";

/**
 * Icon System — design spec page (not a product entry).
 * Lovable is the single source of truth; Codex exports PNGs to /static/icons/.
 */

type Row = {
  name: IconName;
  usage: string;
  /** TabBar items also need an -active.png variant */
  tabBar?: boolean;
};

type Group = { title: string; subtitle: string; rows: Row[] };

const groups: Group[] = [
  {
    title: "TabBar",
    subtitle: "底部导航 — 首页 / 地图 / 发布 / 榜单 / 我的",
    rows: [
      { name: "home", usage: "首页 Tab", tabBar: true },
      { name: "map", usage: "地图 Tab", tabBar: true },
      { name: "publish", usage: "中间发布按钮（完整圆形 +）", tabBar: true },
      { name: "ranking", usage: "榜单 Tab", tabBar: true },
      { name: "profile", usage: "我的 Tab", tabBar: true },
    ],
  },
  {
    title: "Category",
    subtitle: "首页五大分类入口",
    rows: [
      { name: "food", usage: "吃什么" },
      { name: "drink", usage: "喝什么" },
      { name: "play", usage: "娱乐玩乐" },
      { name: "date", usage: "约会" },
      { name: "service", usage: "本地服务" },
    ],
  },
  {
    title: "Function",
    subtitle: "通用功能图标",
    rows: [
      { name: "search", usage: "搜索框 / 搜索入口" },
      { name: "edit", usage: "编辑资料 / 编辑动作" },
      { name: "settings", usage: "设置入口" },
      { name: "location", usage: "定位 / 当前位置" },
      { name: "camera", usage: "上传图片 / 拍照" },
      { name: "heart", usage: "收藏 / 喜欢" },
      { name: "share", usage: "分享" },
      { name: "back", usage: "返回上一页" },
      { name: "phone", usage: "拨打电话" },
      { name: "notification", usage: "消息 / 通知" },
      { name: "shield", usage: "隐私 / 安全" },
      { name: "cache", usage: "缓存 / 存储" },
      { name: "info", usage: "信息 / 帮助" },
    ],
  },
];

function StateCell({ name, state, dark }: { name: IconName; state: "default" | "inactive" | "active"; dark?: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
        dark ? "bg-ink" : "bg-surface"
      }`}
    >
      <BaseIcon name={name} state={state} className={dark ? "text-white" : undefined} />
    </div>
  );
}

function pngNames(row: Row): string[] {
  if (row.tabBar) {
    return [`${row.name}.png`, `${row.name}-active.png`];
  }
  return [`${row.name}.png`];
}

export function IconSystemScreen() {
  return (
    <div className="h-full overflow-y-auto bg-surface pb-10">
      {/* header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-white/90 px-5 py-4 backdrop-blur">
        <Link
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5 text-ink" strokeWidth={2} />
        </Link>
        <h1 className="text-[15px] font-semibold text-ink">Icon System</h1>
        <span className="w-9" />
      </div>

      {/* spec card */}
      <div className="mx-5 mt-5 rounded-2xl bg-white p-4 shadow-[0_2px_8px_-4px_rgba(17,17,17,0.08)]">
        <p className="text-[12px] leading-5 text-ink-soft">
          Lucide 线性图标 · 24px · 2px stroke · round cap / round join · 黑白灰为主。
          暖黄色仅用于评分、等级、徽章。三态：default / inactive / active。
        </p>
        <p className="mt-2 text-[11px] leading-5 text-ink-soft">
          导出路径：<code className="rounded bg-surface px-1 py-0.5 text-ink">/static/icons/&lt;name&gt;.png</code>。
          TabBar 项需额外导出 <code className="rounded bg-surface px-1 py-0.5 text-ink">&lt;name&gt;-active.png</code>。
          Codex 仅按本规范命名复用，不允许自由替换。
        </p>
      </div>

      {/* groups */}
      {groups.map((g) => (
        <section key={g.title} className="mt-6 px-5">
          <div className="mb-3">
            <h2 className="text-[14px] font-semibold text-ink">{g.title}</h2>
            <p className="text-[11px] text-ink-soft">{g.subtitle}</p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_-4px_rgba(17,17,17,0.08)]">
            {/* header row */}
            <div className="grid grid-cols-[88px_1fr_140px] gap-3 border-b border-black/5 px-4 py-2.5 text-[10px] font-medium uppercase tracking-wide text-ink-soft">
              <span>Name</span>
              <span>Usage</span>
              <span className="text-right">States</span>
            </div>

            {g.rows.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-[88px_1fr_140px] items-center gap-3 border-b border-black/5 px-4 py-3 last:border-b-0"
              >
                <code className="text-[11px] font-medium text-ink">{row.name}</code>
                <div className="min-w-0">
                  <p className="truncate text-[12px] text-ink">{row.usage}</p>
                  <p className="mt-0.5 truncate text-[10px] text-ink-soft">
                    {pngNames(row).join(" · ")}
                  </p>
                </div>
                <div className="flex justify-end gap-1.5">
                  <StateCell name={row.name} state="default" />
                  <StateCell name={row.name} state="inactive" />
                  <StateCell name={row.name} state="default" dark />
                </div>
              </div>
            ))}

            {/* legend */}
            <div className="grid grid-cols-[88px_1fr_140px] gap-3 bg-surface px-4 py-2 text-[10px] text-ink-soft">
              <span />
              <span />
              <span className="flex justify-end gap-1.5">
                <span className="w-10 text-center">default</span>
                <span className="w-10 text-center">inactive</span>
                <span className="w-10 text-center">active</span>
              </span>
            </div>
          </div>
        </section>
      ))}

      {/* full export list */}
      <section className="mt-6 px-5">
        <div className="mb-3">
          <h2 className="text-[14px] font-semibold text-ink">PNG Export Manifest</h2>
          <p className="text-[11px] text-ink-soft">
            Codex 按此清单导出 PNG 到 <code>/static/icons/</code>。
          </p>
        </div>
        <pre className="overflow-x-auto rounded-2xl bg-ink p-4 text-[11px] leading-5 text-white/90">
{groups
  .map(
    (g) =>
      `# ${g.title}\n` +
      g.rows.flatMap((r) => pngNames(r).map((n) => `/static/icons/${n}`)).join("\n"),
  )
  .join("\n\n")}
        </pre>
      </section>
    </div>
  );
}
