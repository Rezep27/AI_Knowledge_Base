import OpenAI from "openai";
import "dotenv/config"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function generateAnswer(prompt){
    const response = await openai.responses.create({
        model: "gpt-4o-mini",
        input: prompt
    })

    return response.output_text;
}