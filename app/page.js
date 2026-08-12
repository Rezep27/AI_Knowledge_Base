"use client";

import {useState} from "react";

export default function Home(){
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event){
        event.preventDefault();

        if (!question.trim){
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

            setAnswer(data);

        }catch (error){
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <main>
        
        </main>
    )
}