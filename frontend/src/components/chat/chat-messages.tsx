"use client";

import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cpu, Send } from "lucide-react";
import MessageBubble from "@/components/chat/message-bubble";
import { useChat } from "@/hooks/use-chat";
import { useChatId } from "@/hooks/use-chat-id";

export function NewChatButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("chatId");
        window.location.search = "";
      }}
      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      Novo Chat
    </button>
  );
}

export default function ChatMessages() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const chatId = useChatId();
  const { messages, isLoading, sendMessage } = useChat(chatId);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <>
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 p-2">
          {messages.map((msg) => (
            <MessageBubble key={msg.content} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white">
                <Cpu size={20} />
              </div>
              <div className="flex gap-1 p-3 bg-white rounded-2xl shadow relative">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></span>
                <span className="absolute top-2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="flex items-end gap-2 p-4">
        <div className="relative flex-1">
          <textarea
            className="w-full resize-none rounded-xl border border-gray-300 p-2 pr-12 focus:ring-2 focus:ring-blue-500 outline-none min-h-[44px] max-h-32 text-base bg-white shadow"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-transparent text-blue-600 transition-colors disabled:bg-transparent disabled:text-gray-300 flex items-center justify-center"
            tabIndex={0}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
} 