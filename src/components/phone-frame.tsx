import type { ReactNode } from "react";

export function PhoneFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Device shell */}
        <div className="rounded-[52px] bg-[#1a1a1a] p-[10px] shadow-[0_24px_60px_-30px_rgba(17,17,17,0.35)]">
          <div className="relative h-[760px] w-[360px] overflow-hidden rounded-[44px] bg-surface">
            {/* Status bar */}
            <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-ink">
              <span>9:41</span>
              <div className="absolute left-1/2 top-2 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
              <div className="flex items-center gap-1">
                <span className="text-[10px]">●●●●</span>
                <span>100%</span>
              </div>
            </div>
            {/* Scrollable content */}
            <div className="absolute inset-0 overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
      <p className="text-sm font-medium text-ink-soft">{title}</p>
    </div>
  );
}
