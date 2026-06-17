import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  MessageCircle,
  MapPin,
  Sparkles,
  Trash2,
  Bell,
  FileText,
  Info,
  LogOut,
  Database,
} from "lucide-react";
import { toast } from "sonner";

import { useLocalStorage } from "@/hooks/use-local-storage";

type SettingsState = {
  showLocation: boolean;
  allowRecommend: boolean;
  notifications: boolean;
};

const DEFAULT_SETTINGS: SettingsState = {
  showLocation: true,
  allowRecommend: true,
  notifications: true,
};

export function SettingsScreen() {
  const [settings, setSettings] = useLocalStorage<SettingsState>(
    "jingtai.settings",
    DEFAULT_SETTINGS,
  );
  const [confirmClear, setConfirmClear] = useState(false);

  const set = <K extends keyof SettingsState>(k: K, v: SettingsState[K]) =>
    setSettings({ ...settings, [k]: v });

  const onClearCache = () => {
    toast.success("缓存已清理 · 释放 12.4MB");
  };

  const onLogout = () => {
    toast("已退出登录", { description: "你随时可以再次登录" });
  };

  const onWipe = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      toast("再次点击确认清空", { description: "此操作不可撤销" });
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    try {
      window.localStorage.clear();
    } catch {
      /* ignore */
    }
    toast.success("本地数据已清空");
    setConfirmClear(false);
  };

  return (
    <div className="h-full overflow-y-auto bg-surface pb-16">
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-surface/90 px-4 pt-12 pb-3 backdrop-blur">
        <Link
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-white/80"
        >
          <ChevronLeft className="h-4 w-4 text-ink" strokeWidth={2} />
        </Link>
        <p className="text-[15px] font-bold text-ink">设置</p>
        <div className="h-9 w-9" />
      </div>

      <Section title="账号">
        <Row
          icon={MessageCircle}
          iconBg="bg-[#E8F4EA]"
          iconFg="text-[#3CAF5D]"
          label="微信授权"
          right={<Tag>已绑定</Tag>}
        />
        <Row
          icon={Smartphone}
          iconBg="bg-brand-soft"
          iconFg="text-brand"
          label="手机号"
          right={<span className="text-[12px] text-ink-soft">138 **** 4302</span>}
          chevron
          onClick={() => toast("手机号绑定流程 · 演示")}
        />
      </Section>

      <Section title="隐私">
        <SwitchRow
          icon={MapPin}
          iconBg="bg-[#FFECF1]"
          iconFg="text-[#E48BA3]"
          label="展示位置"
          sub="允许在体验中显示我的位置"
          value={settings.showLocation}
          onChange={(v) => set("showLocation", v)}
        />
        <SwitchRow
          icon={Sparkles}
          iconBg="bg-[#F1EBFB]"
          iconFg="text-[#9B85D9]"
          label="个性化推荐"
          sub="基于兴趣推荐附近内容"
          value={settings.allowRecommend}
          onChange={(v) => set("allowRecommend", v)}
        />
      </Section>

      <Section title="应用">
        <Row
          icon={Trash2}
          iconBg="bg-[#FFF1E6]"
          iconFg="text-[#F08A4B]"
          label="清理缓存"
          right={<span className="text-[12px] text-ink-soft">12.4 MB</span>}
          chevron
          onClick={onClearCache}
        />
        <SwitchRow
          icon={Bell}
          iconBg="bg-[#FFF3DD]"
          iconFg="text-[#B7791F]"
          label="消息通知"
          sub="新评论、收藏、官方消息"
          value={settings.notifications}
          onChange={(v) => set("notifications", v)}
        />
      </Section>

      <Section title="关于">
        <Row
          icon={Info}
          iconBg="bg-surface"
          iconFg="text-ink"
          label="版本"
          right={<span className="text-[12px] text-ink-soft">v1.0.0 (2026.06)</span>}
        />
        <Row
          icon={FileText}
          iconBg="bg-surface"
          iconFg="text-ink"
          label="用户协议与隐私政策"
          chevron
          onClick={() => toast("用户协议 · 演示")}
        />
      </Section>

      <div className="mx-4 mt-4 space-y-2">
        <button
          onClick={onWipe}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-[13px] font-semibold transition-colors active:scale-[0.99] ${
            confirmClear
              ? "border-destructive bg-destructive text-white"
              : "border-destructive/30 bg-white text-destructive hover:bg-destructive/5"
          }`}
        >
          <Database className="h-4 w-4" strokeWidth={1.8} />
          {confirmClear ? "再次点击确认清空" : "清空本地数据"}
        </button>
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-[13px] font-semibold text-destructive shadow-[0_4px_14px_-8px_rgba(17,17,17,0.1)] transition-transform active:scale-[0.99]"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.8} />
          退出登录
        </button>
      </div>

      <p className="mt-6 text-center text-[10px] text-ink-soft/70">
        景泰GO · 发现景泰值得去的地方
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="px-6 pb-2 text-[11px] font-semibold tracking-wide text-ink-soft">
        {title}
      </p>
      <div className="mx-4 overflow-hidden rounded-[20px] bg-white">{children}</div>
    </div>
  );
}

type RowIconProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBg: string;
  iconFg: string;
  label: string;
  sub?: string;
};

function Row({
  icon: Icon,
  iconBg,
  iconFg,
  label,
  sub,
  right,
  chevron,
  onClick,
}: RowIconProps & {
  right?: React.ReactNode;
  chevron?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex w-full items-center gap-3 border-b border-black/5 px-4 py-3.5 text-left transition-colors last:border-b-0 disabled:cursor-default enabled:active:bg-surface"
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-xl ${iconBg}`}
      >
        <Icon className={`h-4 w-4 ${iconFg}`} strokeWidth={1.8} />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-ink">{label}</p>
        {sub && <p className="mt-0.5 text-[10px] text-ink-soft">{sub}</p>}
      </div>
      {right}
      {chevron && <ChevronRight className="h-4 w-4 text-ink-soft/60" />}
    </button>
  );
}

function SwitchRow({
  value,
  onChange,
  ...rest
}: RowIconProps & { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <Row
      {...rest}
      right={
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(!value);
          }}
          className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors ${
            value ? "bg-ink" : "bg-black/10"
          }`}
          role="switch"
          aria-checked={value}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
              value ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      }
    />
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#E8F4EA] px-2 py-0.5 text-[10px] font-medium text-[#3CAF5D]">
      {children}
    </span>
  );
}
