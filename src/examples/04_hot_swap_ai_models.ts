import { generateText, LanguageModel } from "ai";
import { deepseek, mistral } from "../models";

const ask = async (
    prompt: string,
    model: LanguageModel
) => {
    const { text } = await generateText({
        prompt,
        model,
    })
    return text
}


const mistralRes = await ask(
    "How many planets are in our solar system?",
    mistral('Mistral-large-2411')
)
console.log("Mistral response: ", mistralRes)


const DeepSeekRes = await ask(
    "How many planets are in our solar system?",
    deepseek('deepseek/DeepSeek-V3-0324')
)
console.log("DeepSeek response: ", DeepSeekRes)


