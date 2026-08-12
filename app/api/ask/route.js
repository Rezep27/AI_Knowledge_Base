import { ask } from "@/lib/rag";

export async function POST(request){
    try{
        const body = await request.json();

        const { question } = body;

        if (!question || typeof question !== "string"){
            return Response.json(
                {
                    error: "A question is required."
                },
                {
                    status: 400
                }
            );
        }

        const result = await ask(question);

        return Response.json({
            answer: result
        })
    }
    catch (error){
        console.error(error);

        return Response.json(
            {
                error: "Internal server error."
            },
            {
                status: 500
            }
        )
    }
}