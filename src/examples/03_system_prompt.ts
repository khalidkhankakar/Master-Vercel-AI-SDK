import {  streamText } from 'ai';
import { mistral } from '../models';



export const systemPrompt = async (
    prompt: string,
  ) => {

    const { textStream } = await streamText({
      model: mistral('Mistral-large-2411'),
      messages: [
        {
          role: "system",
          content:
            `You are a text summarizer. ` +
            `Summarize the text you receive. ` +
            `Be concise. ` +
            `Return only the summary. ` +
            `Do not use the phrase "here is a summary". ` +
            `Highlight relevant phrases in bold. ` +
            `The summary should be two sentences long. `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
   
    for await (const text of textStream) {
        process.stdout.write(text);
      }
    
      return textStream;
  };

await systemPrompt(
    "what is vercel AI sdk?",
  );