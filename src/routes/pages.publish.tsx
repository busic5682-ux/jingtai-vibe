import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
import { PostScreen } from "@/components/screens";

export const Route = createFileRoute("/pages/publish")({
  head: () => ({
    meta: [
      { title: "发布体验 · 景泰GO" },
      { name: "description", content: "把你刚发现的好地方分享给景泰人。" },
    ],
  }),
  component: PublishPage,
});

function PublishPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <PhoneFrame title="发布体验 · Publish">
        <PostScreen />
      </PhoneFrame>
    </div>
  );
}
