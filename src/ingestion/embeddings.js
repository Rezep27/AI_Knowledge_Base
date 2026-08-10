import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function createEmbeddings(texts) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: texts
    })

    return response.data
        .sort((a, b) => a.index - b.index)
        .map(item => item.embedding);
}