import { Footer, NavBar } from "@/webcomponents/ui";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <nav className="bg-[#FFA66A] h-20 sticky top-0 z-50">
        <NavBar />
      </nav>

      <main className="flex-1 min-h-0 overflow-y-auto block mx-auto ">
        {children}
      </main>
      <footer className="bg-[#262626] ">
        <Footer />
      </footer>
    </div>
  );
}
