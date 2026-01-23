import { Navbar, Sidebar } from "@/webcomponents/admin";

export default async function AdminLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // overflow-hidden on the parent prevents the whole page from scrolling
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar: Fixed width, full height */}
      <aside className="hidden md:flex w-72 h-full border-r border-slate-200">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Navbar stays at the top */}
        <Navbar />

        {/* This is the only part that scrolls */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6 max-md:px-4 lg:px-8 px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
