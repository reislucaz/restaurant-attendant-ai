import { MessageSquare } from "lucide-react";
import { Metadata } from "next";
import ChatMessages, { NewChatButton } from "@/components/chat/chat-messages";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Atendimento Virtual",
  description: "Converse com o atendente virtual do restaurante.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 rounded-lg shadow">
      <div className="flex justify-between items-center bg-white w-full p-4 space-x-2">
        <div className="flex items-center space-x-2">
          <MessageSquare />
          <h1 className="text-xl font-semibold">Atendimento Virtual</h1>
        </div>
        <div className="flex gap-2">
          <a
            href="/menu"
            className="px-3 py-1 bg-slate-200 text-slate-800 rounded-md text-sm font-medium hover:bg-slate-300 transition-colors"
          >
            Menu
          </a>
          <NewChatButton />
        </div>
      </div>
      <Suspense fallback={<div>Carregando...</div>}>
        <ChatMessages />
      </Suspense>
    </div>
  );
}
