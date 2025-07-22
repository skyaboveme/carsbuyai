
import { GoogleGenAI, Chat } from '@google/genai';
import type { Message } from '../types';
import { Sender } from '../types';
import { AI_SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;
let apiKeyError = false;

try {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY environment variable not set');
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} catch (e) {
    apiKeyError = true;
    console.error(e);
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = `<div class="p-4 m-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Configuration Error:</strong>
            <span class="block sm:inline">API_KEY is not configured. Please ensure the API_KEY environment variable is set.</span>
        </div>`;
    }
}

const model = 'gemini-2.5-flash-preview-04-17';
const MAX_HISTORY_MESSAGES = 20; // Safeguard for token limits (10 user/AI turns)

// Helper to format messages for the API
const buildContext = (history: Message[]) => {
  // Filter out the initial welcome message, as system instruction handles the persona.
  const relevantHistory = history.filter(msg => msg.id !== 'initial-ai-message');
  
  // Take only the most recent messages to prevent exceeding token limits.
  const recentHistory = relevantHistory.slice(-MAX_HISTORY_MESSAGES);
  
  return recentHistory.map(message => ({
      role: message.sender === Sender.USER ? 'user' : 'model',
      parts: [{ text: message.text }],
    }));
};

export const getChatResponseStream = (history: Message[], userMessage: string) => {
  if (apiKeyError || !ai) {
    throw new Error('Gemini AI client is not initialized due to API key error.');
  }

  const apiHistory = buildContext(history);

  const chat: Chat = ai.chats.create({
    model,
    history: apiHistory,
    config: {
      systemInstruction: AI_SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });
  
  return chat.sendMessageStream({ message: userMessage });
};

export const generateImage = async (prompt: string): Promise<string> => {
  if (apiKeyError || !ai) {
    throw new Error('Gemini AI client is not initialized due to API key error.');
  }

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
      return imageUrl;
    } else {
      throw new Error('Image generation failed, no images returned.');
    }
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error('An unknown error occurred during image generation.');
  }
};
