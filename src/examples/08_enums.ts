import { generateObject, generateText } from "ai"
import { mistral } from "../model"


const classifyText = async(prompt: string)=>{
    const {object}=await generateObject({
         model: mistral("Mistral-large-2411"), 
         prompt,
         output:'enum',
         enum: ["positive", "negative", "neutral"],
         system:
           `Classify the sentiment of the text as either ` +
           `positive, negative, or neutral.`,
       });

       return object
}

const result = await classifyText(
    `I am feeling great`,
  );
  
  console.log(result);