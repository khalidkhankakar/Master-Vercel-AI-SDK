import { generateText } from "ai";
import { deepseek, mistral } from "../models";
import { readFileSync } from "fs";

const systemPrompt =
  `You will receive an image. ` +
  `Please create an alt text for the image. ` +
  `Be concise. ` +
  `Use adjectives only when necessary. ` +
  `Do not pass 160 characters. ` +
  `Use simple language. `;

export const describeImage = async (
  imagePath: string,
) => {

const imageAsUint8Array = readFileSync(imagePath);

  const { text } = await generateText({
     model:deepseek('deepseek/DeepSeek-V3-0324'),
    system: systemPrompt,
    messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: imageAsUint8Array,
            },
          ],
        },
      ],
  });

  return text;
};

const description = await describeImage(
    "./cover.png",
  );
  
  console.log(description);