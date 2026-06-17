import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
import { SettingsScreen } from "@/components/pages/settings-screen";

export const Route = createFileRoute("/pages/settings")({
  head: () => ({
    meta: [
      { title: "设置 · 景泰GO" },
      { name: "description", content: "账号、隐私与通知设置。" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <PhoneFrame title="设置 · Settings">
        <SettingsScreen />
      </PhoneFrame>
    </div>
  );
}
