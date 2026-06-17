import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
import { IconSystemScreen } from "@/components/pages/icon-system-screen";

export const Route = createFileRoute("/pages/icon-system")({
  head: () => ({
    meta: [
      { title: "Icon System · 景泰GO" },
      {
        name: "description",
        content: "景泰GO 统一图标系统：TabBar、分类、功能、徽章及 PNG 导出命名规范。",
      },
    ],
  }),
  component: IconSystemPage,
});

function IconSystemPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <PhoneFrame title="Icon System">
        <IconSystemScreen />
      </PhoneFrame>
    </div>
  );
}
