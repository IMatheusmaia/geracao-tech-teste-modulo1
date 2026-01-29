"use client";

import * as React from "react";
import type { Message } from "@/lib/types";
import { getAIResponse } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { Card } from "../ui/card";

export default function ChatLayout() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    try {
      const storedMessages = localStorage.getItem("chat_messages");
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error("Failed to load messages from local storage:", error);
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to local storage:", error);
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const result = await getAIResponse(updatedMessages);
      const aiMessage: Message = {
        id: `${Date.now()}-${Math.random()}`,
        role: "assistant",
        content: result.response,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col flex-1 overflow-hidden shadow-2xl shadow-primary/10">
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Card>
  );
}
