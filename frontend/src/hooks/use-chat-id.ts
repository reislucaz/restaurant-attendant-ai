"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function useChatId() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [chatId, setChatId] = useState<string>();

  useEffect(() => {
    const id = searchParams.get("chatId") || localStorage.getItem("chatId");
    if (id) {
      setChatId(id);
      localStorage.setItem("chatId", id);
    }
  }, [router, searchParams]);

  return chatId;
}
