import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
  context: {
    temperature: 0.7,
    maxOutputTokens: 1024,
    topP: 0.95,
    topK: 40,
  }
});
