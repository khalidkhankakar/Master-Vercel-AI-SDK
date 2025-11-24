import { streamText, UIMessage, convertToModelMessages } from 'ai';
// import { groq } from '@ai-sdk/groq';
import { createOllama } from 'ollama-ai-provider-v2';


const ollama = createOllama({
  baseURL:"http://127.0.0.1:11434/api",
})

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const model = ollama('qwen3:1.7b')
  const result = streamText({
    model,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}