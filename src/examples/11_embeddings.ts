import { cosineSimilarity, embed, embedMany } from "ai";
import { openai } from "../models";


const values = ["Dog", "Cat", "Car", "Bike"];

const model = openai.embedding(
    "text-embedding-3-large",
);

  
const { embeddings } = await embedMany({
    model,
    values,
  });
  
// console.dir(embeddings, { depth: null });
  
const vectorDatabase = embeddings.map(
    (embedding, index) => ({
      value: values[index],
      embedding,
    }),
);

const searchTerm = await embed({
  model,
  value: "tire",
});


const entries = vectorDatabase.map((entry) => {
  return {
    value: entry.value,
    similarity: cosineSimilarity(
      entry.embedding,
      searchTerm.embedding,
    ),
  };
});

const sortedEntries = entries.sort(
    (a, b) => b.similarity - a.similarity,
  );
  
  console.dir(sortedEntries, { depth: null });