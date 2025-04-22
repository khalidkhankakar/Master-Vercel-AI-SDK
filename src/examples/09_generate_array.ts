import { generateObject } from "ai"
import { mistral } from "../model"

import { z } from "zod";

const schema = z.object({
  name: z.string().describe("The name of the user"),
  age: z.number().describe("The user's age"),
  email: z
    .string()
    .email()
    .describe(
      "The user's email address, @example.com",
    ),
});

const generateUserArray = async(prompt: string)=>{
    const {object}=await generateObject({
         model: mistral("Mistral-large-2411"), 
         prompt,
         system: `You are generating fake user data.`,
         output: "array",
         schema,
       });

       return object
}

const result = await generateUserArray(
    `Generate 5 fake users in Qila saifullah Pakistan`,
  );
  
  console.log({result});