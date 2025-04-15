import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

const model = anthropic("claude-3-5-haiku-latest");

export const answerMyQuestion = async (
  prompt: string,
) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};

const answer = await answerMyQuestion(
  "what is the chemical formula for dihydrogen monoxide?",
);

console.log(answer);