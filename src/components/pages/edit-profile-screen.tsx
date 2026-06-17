import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  Camera,
  MapPin,
  UtensilsCrossed,
  Coffee,
  Gamepad2,
  Heart,
  Check,
} from "lucide-react";
import { toast } from "sonner";

import avatar from "@/assets/avatar.jpg";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Gender = "male" | "female" | "hidden";

type UserProfile = {
  avatar: string;
  nickname: string;
  gender: Gender;
  region: string;
  tags: string[];
  bio: string;
};

const DEFAULT_PROFILE: UserProfile = {
  avatar: "",
  nickname: "小满 Mantou",
  gender: "hidden",
  region: "景泰县 · 一条街",
  tags: ["吃什么", "喝什么"],
  bio: "晚上九点的烧烤摊最好吃。",
};

const REGIONS = [
  "景泰县 · 一条街",
  "景泰县 · 北街口",
  "景泰县 · 文化广场",
  "景泰县 · 县医院商圈",
  "景泰县 · 五佛乡",
];

const TAGS = [
  { key: "吃什么", icon: UtensilsCrossed },
  { key: "喝什么", icon: Coffee },
  { key: "娱乐", icon: Gamepad2 },
  { key: "约会", icon: Heart },
];

export function EditProfileScreen() {
  const [stored, setStored] = useLocalStorage<UserProfile>(
    "jingtai.userProfile",
    DEFAULT_PROFILE,
  );
  const [profile, setProfile] = useState<UserProfile>(stored);
  const [regionOpen, setRegionOpen] = useState(false);

  useEffect(() => {
    setProfile(stored);
  }, [stored]);

  const toggleTag = (t: string) => {
    setProfile((p) => ({
      ...p,
      tags: p.tags.includes(t) ? p.tags.filter((x) => x !== t) : [...p.tags, t],
    }));
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setProfile((p) => ({ ...p, avatar: String(reader.result) }));
    reader.readAsDataURL(f);
  };

  const onSave = () => {
    if (!profile.nickname.trim()) {
      toast.error("请填写昵称");
      return;
    }
    setStored(profile);
    toast.success("保存成功");
  };

  const avatarSrc = profile.avatar || avatar;

  return (
    <div className="h-full overflow-y-auto bg-surface pb-28">
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-surface/90 px-4 pt-12 pb-3 backdrop-blur">
        <Link
          to="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-white/80"
        >
          <ChevronLeft className="h-4 w-4 text-ink" strokeWidth={2} />
        </Link>
        <p className="text-[15px] font-bold text-ink">编辑资料</p>
        <div className="h-9 w-9" />
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <label className="relative cursor-pointer">
          <img
            src={avatarSrc}
            alt="头像"
            className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-[0_8px_24px_-12px_rgba(17,17,17,0.3)]"
          />
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-ink">
            <Camera className="h-3.5 w-3.5 text-white" strokeWidth={2} />
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onAvatarChange}
          />
        </label>
        <p className="mt-2 text-[11px] text-ink-soft">点击更换头像</p>
      </div>

      {/* Basic info */}
      <div className="mx-4 mt-4 overflow-hidden rounded-[20px] bg-white">
        <FieldRow label="昵称" required>
          <input
            value={profile.nickname}
            onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
            placeholder="给自己起个名字"
            maxLength={20}
            className="w-full border-0 bg-transparent text-right text-[13px] font-medium text-ink outline-none placeholder:text-ink-soft/50"
          />
        </FieldRow>
        <Divider />
        <div className="px-4 py-3">
          <p className="text-[12px] font-semibold text-ink-soft">性别</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {([
              { v: "male", l: "男" },
              { v: "female", l: "女" },
              { v: "hidden", l: "不展示" },
            ] as { v: Gender; l: string }[]).map((g) => {
              const on = profile.gender === g.v;
              return (
                <button
                  key={g.v}
                  onClick={() => setProfile({ ...profile, gender: g.v })}
                  className={`rounded-xl py-2 text-[12px] font-medium transition-colors ${
                    on
                      ? "bg-ink text-white"
                      : "bg-surface text-ink-soft hover:bg-surface/70"
                  }`}
                >
                  {g.l}
                </button>
              );
            })}
          </div>
        </div>
        <Divider />
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-ink-soft">简介</p>
            <p className="text-[10px] text-ink-soft/70">
              {profile.bio.length}/50
            </p>
          </div>
          <textarea
            value={profile.bio}
            onChange={(e) =>
              setProfile({ ...profile, bio: e.target.value.slice(0, 50) })
            }
            placeholder="一句话介绍自己"
            rows={2}
            className="mt-2 w-full resize-none rounded-xl bg-surface px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-soft/50"
          />
        </div>
      </div>

      {/* Region */}
      <div className="mx-4 mt-4 overflow-hidden rounded-[20px] bg-white">
        <button
          onClick={() => setRegionOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3.5 transition-colors active:bg-surface"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-soft">
              <MapPin className="h-4 w-4 text-brand" strokeWidth={1.8} />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-semibold text-ink">常驻区域</p>
              <p className="text-[10px] text-ink-soft">影响附近推荐</p>
            </div>
          </div>
          <span className="text-[12px] font-medium text-ink-soft">
            {profile.region}
          </span>
        </button>
        {regionOpen && (
          <div className="border-t border-black/5 px-2 py-2">
            {REGIONS.map((r) => {
              const on = r === profile.region;
              return (
                <button
                  key={r}
                  onClick={() => {
                    setProfile({ ...profile, region: r });
                    setRegionOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[12px] transition-colors ${
                    on ? "bg-surface text-ink" : "text-ink-soft hover:bg-surface/60"
                  }`}
                >
                  <span>{r}</span>
                  {on && <Check className="h-4 w-4 text-ink" strokeWidth={2.2} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="mx-4 mt-4 rounded-[20px] bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink">兴趣标签</p>
          <span className="text-[10px] text-ink-soft">已选 {profile.tags.length}</span>
        </div>
        <p className="mt-0.5 text-[10px] text-ink-soft">选择你感兴趣的，我们推得更准</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {TAGS.map((t) => {
            const on = profile.tags.includes(t.key);
            return (
              <button
                key={t.key}
                onClick={() => toggleTag(t.key)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[12px] font-medium transition-colors ${
                  on
                    ? "border-ink bg-ink text-white"
                    : "border-black/5 bg-surface text-ink-soft hover:bg-surface/70"
                }`}
              >
                <t.icon className="h-4 w-4" strokeWidth={1.8} />
                {t.key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save bar */}
      <div className="absolute inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/90 px-4 pb-5 pt-3 backdrop-blur">
        <button
          onClick={onSave}
          className="w-full rounded-2xl bg-ink py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(17,17,17,0.4)] transition-transform active:scale-[0.98]"
        >
          保存
        </button>
      </div>
    </div>
  );
}

function FieldRow({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <p className="w-16 shrink-0 text-[12px] font-semibold text-ink-soft">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </p>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="mx-4 h-px bg-black/5" />;
}
