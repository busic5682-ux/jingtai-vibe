import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
import { EditProfileScreen } from "@/components/pages/edit-profile-screen";

export const Route = createFileRoute("/pages/edit-profile")({
  head: () => ({
    meta: [
      { title: "编辑资料 · 景泰GO" },
      { name: "description", content: "完善你的资料，让推荐更懂你。" },
    ],
  }),
  component: EditProfilePage,
});

function EditProfilePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <PhoneFrame title="编辑资料 · Edit Profile">
        <EditProfileScreen />
      </PhoneFrame>
    </div>
  );
}
