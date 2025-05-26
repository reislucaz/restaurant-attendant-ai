import { cn } from "@/lib/utils";
import { User, Cpu } from "lucide-react";
import { Message } from "@/@types/message";
import ReactMarkdown from "react-markdown";
  
export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "USER";
  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isUser ? "bg-blue-600 text-white" : "bg-purple-700 text-white"
        }`}
      >
        {isUser ? <User size={20} /> : <Cpu size={20} />}
      </div>
      <div
        className={`relative max-w-[75%] p-3 shadow ${
          isUser
            ? "bg-blue-600 text-white rounded-2xl"
            : "bg-white text-gray-900 rounded-2xl"
        }`}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
        <span
          className={cn(
            "absolute w-0 h-0 border-y-8 border-y-transparent",
            isUser
              ? "right-[-6px] top-1/2 -translate-y-1/2 border-l-8 border-l-blue-600 border-r-0"
              : "left-[-6px] top-1/2 -translate-y-1/2 border-r-8 border-r-white border-l-0"
          )}
        />
      </div>
    </div>
  );
}
