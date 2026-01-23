import { SettingsBar } from "@/webcomponents/protected";
import { HeadingTwo } from "@/webcomponents/reusable";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <HeadingTwo
        title="Settings"
        description="Manage your account settings and preferences"
      />

      <div className="flex items-start max-md:flex-col py-16 gap-3.5 w-full">
        <SettingsBar />
        <div className="flex-1 bg-white shadow-md p-3.5 rounded-md max-md:w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
