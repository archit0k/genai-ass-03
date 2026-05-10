import OpenAI from "openai";
import { getVectorStore } from "../config/qdrant.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
});

export const askQuestion = async (question) => {
  const vectorStore = await getVectorStore();

  const retriever = vectorStore.asRetriever({
    k: 3
  });

  const docs = await retriever.invoke(question);

  const context = docs.map((doc) => doc.pageContent).join("\n\n");

  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content: `
You are a RAG AI assistant.

Answer ONLY from the provided context.
If the answer is not present in the context, say:
"I could not find this information in the uploaded document."

Context:
${context}
`
      },
      {
        role: "user",
        content: question
      }
    ]
  });

  return {
    answer: response.choices[0].message.content,
    sources: docs.map((doc) => doc.pageContent)
  };
};
