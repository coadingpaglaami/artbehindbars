import Image from "next/image";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <Image
        src="/navbar/logo.svg"
        alt="Logo"
        width={48}
        height={48}
        className="mb-6"
      />
      {children}
    </div>
  );
}
