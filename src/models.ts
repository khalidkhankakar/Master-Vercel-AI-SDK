import { createDeepSeek } from "@ai-sdk/deepseek";
import { createMistral } from "@ai-sdk/mistral";
import { createOpenAI } from "@ai-sdk/openai";
import { extractReasoningMiddleware, wrapLanguageModel } from "ai";

export const deepseek = createDeepSeek({
    baseURL: 'https://models.github.ai/inference',
    apiKey: process.env.DEEPSEEK_API_KEY,
  });
  
export const mistral = createMistral({
    baseURL:"https://models.inference.ai.azure.com",
    apiKey: process.env.MISTRAL_API_KEY,

});

export const openai = createOpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env.OPENAI_API_KEY,
    
})

export const reasoningModel = wrapLanguageModel({
    model: mistral('Mistral-large-2411'),
    middleware:extractReasoningMiddleware({tagName: "think"})
})

export const openAIModel = openai("text-embedding-3-large",)
export const mistralModel = mistral('Mistral-large-2411')
export const deepseekModel = deepseek('deepseek/DeepSeek-V3-0324')


