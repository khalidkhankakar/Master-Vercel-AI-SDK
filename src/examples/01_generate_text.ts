import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from "ai";

// const anthropic = createAnthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });
const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});
export const answerMyQuestion = async (
  prompt: string,
) => {
  console.log(process.env.DEEPSEEK_API_KEY)
  const { text } = await generateText({
    model: deepseek('deepseek-chat'),
    prompt,
  });

  return text;
};

const answer = await answerMyQuestion(
  "what is the chemical formula for dihydrogen monoxide?",
);

console.log(answer);