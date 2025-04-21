import {  streamObject } from "ai";
import { z } from "zod";
import {  mistral } from "../model";


const recipeSchema = z.object({
    recipe: z.object({
        name: z
          .string()
          .describe("The title of the recipe"),
        ingredients: z
          .array(
            z.object({
              name: z.string(),
              amount: z.string(),
            }),
          )
          .describe(
            "The ingredients needed for the recipe",
          ),
        steps: z
          .array(z.string())
          .describe("The steps to make the recipe"),
      }),
})



const generateRecipe = async (prompt: string) => {

    const result = streamObject({
        model: mistral("Mistral-large-2411"), 
        schemaName: "Recipe",
        schema: recipeSchema,
        prompt,
        system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,

    })

    for await (const obj of result.partialObjectStream) {
      console.clear();
      console.dir(obj, { depth: null });
    }
  
    const finalObject = await result.object;
  
    return finalObject.recipe;
}

await generateRecipe("How to make chicken Biryani.");