import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { groq } from '@ai-sdk/groq';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const model = groq('openai/gpt-oss-120b')
  const result = streamText({
    model,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}