"use client";

import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  const aiAvatar = PlaceHolderImages.find(p => p.id === 'ai-avatar');

  return (
    <div
      className={cn(
        "flex items-start gap-3 animate-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 shrink-0">
          {aiAvatar ? (
             <Image src={aiAvatar.imageUrl} alt={aiAvatar.description} width={32} height={32} data-ai-hint={aiAvatar.imageHint} />
          ) : (
            <AvatarFallback>
              <Bot />
            </AvatarFallback>
          )}
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-lg p-3 text-sm shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card"
        )}
      >
        {message.content.split('\n').map((line, index) => (
          <p key={index} className="[&:not(:first-child)]:mt-2">{line}</p>
        ))}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8 shrink-0">
          {userAvatar ? (
             <Image src={userAvatar.imageUrl} alt={userAvatar.description} width={32} height={32} data-ai-hint={userAvatar.imageHint} />
          ) : (
            <AvatarFallback>
              <User />
            </AvatarFallback>
          )}
        </Avatar>
      )}
    </div>
  );
}
