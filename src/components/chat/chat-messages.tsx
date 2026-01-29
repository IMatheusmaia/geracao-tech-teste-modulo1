"use client";

import * as React from "react";
import type { Message } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import { LoaderCircle } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1" viewportRef={viewportRef}>
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 animate-in">
             <div className="w-8 h-8" />
             <div className="flex items-center justify-center p-3">
              <LoaderCircle className="w-5 h-5 animate-spin text-primary" />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
