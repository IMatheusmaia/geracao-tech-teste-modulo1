import ChatLayout from "@/components/chat/chat-layout";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <a
          target="_blank"
          href="https://github.com/google/firebase-studio"
        >
          <Github className="text-muted-foreground" />
        </a>
      </div>
      <div className="w-full max-w-4xl h-full md:h-[90dvh] md:max-h-[800px] flex flex-col p-4">
        <header className="mb-4 text-center">
          <h1 className="text-4xl font-headline font-bold text-primary tracking-tighter">GeminiChat</h1>
          <p className="text-sm text-muted-foreground">Your friendly AI-powered chat assistant</p>
        </header>
        <ChatLayout />
      </div>
    </main>
  );
}
