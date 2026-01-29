"use server";

import { generateResponse } from "@/ai/flows/generate-response";
import type { Message } from "@/lib/types";

function formatChatHistory(messages: Message[]): string {
  return messages
    .map((msg) => `${msg.role === 'user' ? 'User' : 'GeminiChat'}: ${msg.content}`)
    .join('\n');
}

export async function getAIResponse(messages: Message[]) {
  if (messages.length === 0) {
    return { response: "Hello! How can I help you today?" };
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== 'user') {
    // Should not happen, but as a safeguard
    return { response: "I'm ready when you are." };
  }

  const history = messages.slice(0, -1);
  const chatHistory = formatChatHistory(history);
  
  try {
    const result = await generateResponse({
      currentMessage: lastMessage.content,
      chatHistory: chatHistory,
    });
    return result;
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw new Error("Failed to get a response from the AI. Please check the server logs.");
  }
}
