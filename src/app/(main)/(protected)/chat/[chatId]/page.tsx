import { mockThreads } from "@/data/messagethread";
import { ChatWindow, ThreadList } from "@/webcomponents/protected";
import { notFound } from "next/navigation";

interface ChatDetailPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default async function ChatDetailPage({ params }: ChatDetailPageProps) {
  const { chatId } = await params;
  const thread = mockThreads.find((t) => t.threadId === chatId);

  if (!thread) notFound();

  return (
    <div className="flex h-screen">
      <ThreadList threads={mockThreads} />
      <ChatWindow thread={thread} />
    </div>
  );
}
