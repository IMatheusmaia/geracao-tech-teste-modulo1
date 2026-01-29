import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-chat-history.ts';
import '@/ai/flows/generate-conversation-starter.ts';
import '@/ai/flows/generate-response.ts';
