
import { ChatWindow, ThreadList } from "@/webcomponents/protected";
import { notFound } from "next/navigation";

interface ChatDetailPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default async function ChatDetailPage({ params }: ChatDetailPageProps) {
  const { chatId } = await params;

  return (
    <div className="flex h-screen">
      <ThreadList />
      <ChatWindow chatId={chatId} />
    </div>
  );
}
