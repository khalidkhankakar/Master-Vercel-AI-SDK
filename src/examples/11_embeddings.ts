import { embed } from "ai";
import { openai } from "../model";




const { embedding } = await embed({
    model:openai.embedding("text-embedding-3-large"),
    value: 'sunny day at the beach',
  });

console.log(embedding);