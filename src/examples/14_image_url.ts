import { generateText, streamText } from "ai";
import { z } from "zod";
import { llama } from "../models"; // adjust this based on your model import structure
import dedent from "dedent";
import { readFileSync } from "fs";

// Define schema for bill extraction
export const extractSchema = z.object({
  businessName: z
    .string()
    .optional()
    .describe("Name of the business where the bill was created"),
  date: z.string().optional().describe("Date when the bill was created"),
  billItems: z
    .array(
      z.object({
        name: z.string().describe("Name of the item"),
        price: z.number().describe("Price of the item in decimal format"),
      })
    )
    .describe("List of items in the bill"),
  tax: z
    .number()
    .optional()
    .describe("Tax amount, not percentage we need money amount"),
  tip: z
    .number()
    .optional()
    .describe(
      "Tip or Gratuity amount, not percentage we need money amount and if multiple tips are shown just output the medium one"
    ),
});

export type ExtractSchemaType = z.infer<typeof extractSchema>;

// Instructional prompt
const systemPrompt = dedent`
  You are an expert at extracting information from receipts.

  Your task:
  1. Analyze the receipt image provided
  2. Extract all relevant billing information
  3. Format the data in a structured way

  Guidelines for extraction:
  - Identify the restaurant/business name and location if available otherwise just return null
  - Find the receipt date or return null, date format should be YYYY-MM-DD but if day it's less than 10 don't add a 0 in front
  - Extract each item with its name and total price
  - Capture tax amount, if applicable and not percentage but the money amount otherwise return null
  - Identify any tips or gratuities, if multiple tips are shown just output the medium one otherwise return null
  - Ensure all numerical values are accurate
  - Convert all prices to decimal numbers

  IMPORTANT: Extract ONLY the information visible in the receipt. Do not make assumptions about missing data.

  Return the result as a valid JSON object matching this schema:
  {
    businessName: string | null,
    date: string | null,
    billItems: { name: string, price: number }[],
    tax: number | null,
    tip: number | null
  }
`;

export const extractFromReceipt = async ()=> {

// Read the image file and convert to base64
const imagePath = "./receipt.png"; // <-- update this path as needed
const imageBuffer = readFileSync(imagePath);
const imageBase64 = imageBuffer.toString("base64");

const {text} = await generateText({
    model: llama("meta/Llama-4-Scout-17B-16E-Instruct"),
    messages: [
        {
            role: 'user',
            content: [
                { type: 'text', text: systemPrompt },
                {
                    type: 'image',
                    image: imageBase64,
                },
            ],
        },
    ],
    topP: 0.8,
    temperature: 0.1,
    maxTokens: 2048,

});

 return text
};

// Usage example
(async () => {
  try {
    const result = await extractFromReceipt();
    console.log("✅ Extracted receipt data:", {result});
  } catch (err) {
    console.error("Error extracting receipt:", err);
  }
})();
