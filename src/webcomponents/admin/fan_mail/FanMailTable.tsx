import { FormattedFanMail } from "@/types/fanmail.type";
import { ChevronRight } from "lucide-react";

interface FanMailTableProps {
  messages: FormattedFanMail[];
  onMessageClick: (message: FormattedFanMail) => void;
}

export const FanMailTable = ({
  messages,
  onMessageClick,
}: FanMailTableProps) => {
  if (messages.length === 0) {
    return (
      <div className="w-full py-12 text-center text-gray-500">
        No messages found
      </div>
    );
  }

  return (
    <div className="w-full">
      {messages.map((message) => (
        <div
          key={message.messageId}
          className="grid grid-cols-12 gap-4 py-4 px-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer items-center"
          onClick={() => onMessageClick(message)}
        >
          {/* Column 1: From and To */}
          <div className="col-span-3">
            <p className="text-sm font-medium text-gray-900">{message.from}</p>
            <p className="text-xs text-gray-500">To: {message.to}</p>
          </div>

          {/* Column 2: Subject */}
          <div className="col-span-3">
            <p className="text-sm text-gray-900">{message.subject}</p>
          </div>

          {/* Column 3: Body */}
          <div className="col-span-4">
            <p className="text-sm text-gray-600 truncate">{message.body}</p>
          </div>

          {/* Column 4: Date and Arrow */}
          <div className="col-span-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">{message.date}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};