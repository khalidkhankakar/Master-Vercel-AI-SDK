import { generateText } from "ai";
import {  reasoningModel } from "../models";



export const answerMyQuestion = async (
  prompt: string,
) => {
  const { text , reasoning} = await generateText({
    model: reasoningModel,
    prompt,
  });
  console.log({reasoning});
 
  return text;
};

const answer = await answerMyQuestion(
  "what is the chemical formula for dihydrogen monoxide? also give me a reason why",
);

console.log(answer);