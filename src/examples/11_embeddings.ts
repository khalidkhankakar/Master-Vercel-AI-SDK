import { embed, embedMany } from "ai";
import { openai } from "../model";


const values = ["Dog", "Cat", "Car", "Bike"];

const model = openai.embedding(
    "text-embedding-3-large",
);

  
const { embeddings } = await embedMany({
    model,
    values,
  });
  
console.dir(embeddings, { depth: null });
  
  