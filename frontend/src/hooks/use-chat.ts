import { Message } from "@/@types/message";
import { apiClient } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

export function useChat(chatId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loadMessages = useCallback(async () => {
    if (!chatId) return;
    try {
      const res = await apiClient.get<Message[]>(`/messages?chatId=${chatId}`);
      setMessages(res.data.reverse());
    } catch (error) {
      console.error("Error loading messages", error);
    }
  }, [chatId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;
      setIsLoading(true);
      
      const newMessage: Message = {
        content,
        sender: "USER",
      }

      setMessages((prev) => [...prev, newMessage]);

      try {
        const res = await apiClient.post("/messages", {
          content,
          sender: "USER",
          chatId: chatId || undefined,
        });

        if (!chatId) {
          router.replace(`?chatId=${res.data.chatId}`);
        }

        await loadMessages();
      } catch (error) {
        console.error("Error sending message", error);
      } finally {
        setIsLoading(false);
      }
    },
    [chatId, loadMessages, router]
  );

  return { messages, isLoading, sendMessage };
}
