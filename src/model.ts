import { createDeepSeek } from "@ai-sdk/deepseek";
import { createMistral } from "@ai-sdk/mistral";

export const deepseek = createDeepSeek({
    baseURL: 'https://models.github.ai/inference',
    apiKey: process.env.DEEPSEEK_API_KEY,
  });
  
export const mistral = createMistral({
    baseURL:"https://models.inference.ai.azure.com",
    apiKey: process.env.MISTRAL_API_KEY,
});