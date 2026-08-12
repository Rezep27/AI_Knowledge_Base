"use client";

import {useState} from "react";

export default function Home(){
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event){
        event.preventDefault();

        if (!question.trim()){
            return;
        }

        setLoading(true);
        setError("");
        setAnswer("");

        try{
            const response = await fetch("api/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({question})
            });

            const data = await response.json();

            if (!response.ok){
                throw new Error(
                    data.Error || "Something went wrong."
                );
            }

            setAnswer(data.answer);

        }catch (error){
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <main>
            <h1>Learning React Knowledge Base</h1>

            <form onSubmit={handleSubmit}>
                <textarea 
                    value={question}
                    onChange={(event) => {
                        setQuestion(event.target.value);
                    }}
                    placeholder="Ask me something about Learning React..."
                    />
                <button type="submit" disabled={loading}>{loading ? "Thinking..." : "Ask"}</button>
            </form>

            {error && (
                <p>
                    Error: {error}
                </p>
            )}

            {answer && (
                <section>
                    <h2>Answer</h2>
                    <p>{answer}</p>
                </section>
            )}
        </main>
    )
}