import { generateObject } from "ai";
import { z } from "zod";
import { deepseek } from "../model";


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



const generateRecipe = async (prompt: string):Promise<z.infer<typeof recipeSchema>> => {

    const {object} = await generateObject({
        model: deepseek('deepseek/DeepSeek-V3-0324'),
        schema: recipeSchema,
        prompt,
        system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,

    })

    return object;
}

const foodRecipe = await generateRecipe("Create a recipe for a chocolate cake.");
console.log({recipe: foodRecipe.recipe});