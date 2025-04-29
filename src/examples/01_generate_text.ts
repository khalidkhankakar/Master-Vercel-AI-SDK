import { generateText } from "ai";
import { deepseek } from "../models";



export const answerMyQuestion = async (
  prompt: string,
) => {
  console.log('loadding model...');
  const { text } = await generateText({
    model: deepseek('deepseek/DeepSeek-V3-0324'),
    prompt,
  });
 
  return text;
};

const answer = await answerMyQuestion(
  "what is the chemical formula for dihydrogen monoxide?",
);

console.log(answer);