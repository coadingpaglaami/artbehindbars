import { mockThreads } from "@/data/messagethread";
import { ThreadList } from "@/webcomponents/protected";

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      <ThreadList threads={mockThreads} />

      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p className="text-xl">Select a conversation to start messaging</p>
      </div>
    </div>
  );
}
