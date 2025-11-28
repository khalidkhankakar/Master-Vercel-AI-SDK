import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { th } from 'date-fns/locale';
// import { groq } from '@ai-sdk/groq';
import { createOllama } from 'ollama-ai-provider-v2';


// https://ollama-56562450710.europe-west1.run.app/api
// qwen3-vl:4b


// https://ollama-new-56562450710.me-central1.run.app/
// deepseek-r1:1.5b

const ollama = createOllama({
  baseURL:"https://ollama-new-56562450710.me-central1.run.app/api",
})

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const model = ollama('deepseek-r1:1.5b')
  const result = streamText({

    model,
    messages: convertToModelMessages(messages),
    // providerOptions: { ollama:{ thi }
  });

  return result.toUIMessageStreamResponse();
}