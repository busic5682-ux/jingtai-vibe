import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
import {
  HomeScreen,
  DiscoverScreen,
  DetailScreen,
  PostScreen,
  RankScreen,
  MeScreen,
} from "@/components/screens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "景泰GO · 发现景泰值得去的地方" },
      {
        name: "description",
        content:
          "景泰GO 是面向景泰县年轻人的本地生活发现平台，发现真实优质的吃喝玩乐与约会聚会去处。",
      },
      { property: "og:title", content: "景泰GO · 本地生活发现" },
      {
        property: "og:description",
        content: "年轻人喜欢的景泰本地生活发现平台 UI 设计稿。",
      },
    ],
  }),
  component: Showcase,
});

function Showcase() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Top brand bar */}
      <header className="px-6 pt-10 pb-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink">
              <span className="text-[13px] font-black text-white">GO</span>
            </div>
            <div>
              <p className="text-[16px] font-bold text-ink">景泰GO</p>
              <p className="text-[11px] text-ink-soft">
                发现景泰值得去的地方 · UI 设计稿
              </p>
            </div>
          </div>
          <span className="hidden rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-medium text-ink-soft md:inline">
            微信小程序 · 2026 设计
          </span>
        </div>
      </header>

      {/* Hero copy */}
      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-3xl pb-10 text-center">
          <h1 className="text-[34px] font-black leading-tight tracking-tight text-ink md:text-[48px]">
            年轻人会喜欢的<br className="md:hidden" />
            <span className="text-brand">本地生活</span>发现产品
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-ink-soft md:text-[14px]">
            高保真 UI 设计稿 · 六个核心页面 · 极简、现代、轻社交。
            参考 Apple Maps · Spotify · 小红书 · Notion 的视觉语言。
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-ink-soft">
            {["Minimal", "Modern", "Premium", "Young", "Local Discovery", "Glassmorphism"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-black/5 bg-white px-3 py-1.5"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Phone grid */}
      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <PhoneFrame title="01 · 首页 Home">
            <HomeScreen />
          </PhoneFrame>
          <PhoneFrame title="02 · 发现 Discover Map">
            <DiscoverScreen />
          </PhoneFrame>
          <PhoneFrame title="03 · 地点详情 Detail">
            <DetailScreen />
          </PhoneFrame>
          <PhoneFrame title="04 · 发布 Post">
            <PostScreen />
          </PhoneFrame>
          <PhoneFrame title="05 · 榜单 Rank">
            <RankScreen />
          </PhoneFrame>
          <PhoneFrame title="06 · 我的 Profile">
            <MeScreen />
          </PhoneFrame>
        </div>
      </section>

      <footer className="border-t border-black/5 px-6 py-8 text-center text-[11px] text-ink-soft md:px-12">
        景泰GO · 发现景泰值得去的地方 · Designed for 18–35 年轻用户
      </footer>
    </div>
  );
}
