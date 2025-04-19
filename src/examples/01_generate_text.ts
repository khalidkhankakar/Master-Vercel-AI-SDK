import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from "ai";

const deepseek = createDeepSeek({
  baseURL: 'https://models.github.ai/inference',
  apiKey: process.env.DEEPSEEK_API_KEY,
});


export const answerMyQuestion = async (
  prompt: string,
) => {
  console.log('loadding model...');
  const { text } = await generateText({
    model: deepseek('deepseek/DeepSeek-V3-0324'),
    prompt,
  });
 
  console.log('model loaded!');
  console.log('model response:', text);

  return text;
};

const answer = await answerMyQuestion(
  "what is the chemical formula for dihydrogen monoxide?",
);

console.log(answer);