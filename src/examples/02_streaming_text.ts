import {  streamText } from "ai";
import { deepseek } from '../models';



export const answerMyQuestion = async (
  prompt: string,
) => {
  const { textStream } = streamText({
    model: deepseek('deepseek/DeepSeek-V3-0324'),
    prompt,
  });
 
  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
};

await answerMyQuestion(
    "What is the color of the sun?",
  );
