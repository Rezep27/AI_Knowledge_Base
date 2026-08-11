import OpenAI from "openai";
import "dotenv/config";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function search(index, question, topK = 5){

    //Turn the question into a vector
    const embbededResponse =await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: question
    })

    const queryVector = embbededResponse.data[0].embedding;

    //Search similar vectors on pinecone

    const searchResult =await  index.query({
        vector: queryVector,
        topK: topK,
        includeMetadata: true
    });

    return [...Object.values(searchResult.matches)];
}