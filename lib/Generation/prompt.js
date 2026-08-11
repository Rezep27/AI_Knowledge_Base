export function buildPrompt(question, matches){

    const context = matches.map((item) =>{
        return `[Page ${item.metadata.page}] \n ${item.metadata.text}`
    }).join('\n---\n');

    return `
    You are a knowledgeable assistant that answers questions
about the book "Learning React".

Use the provided context to answer the user's question.

Rules:
- Answer using only information supported by the context.
- If the context does not contain enough information, say so.
- Do not invent information.
- When useful, mention the page where the information was found.
- Preserve code examples accurately.

CONTEXT:
${context}

QUESTION:
${question}
    `;
}