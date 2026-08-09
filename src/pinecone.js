import {Pinecone} from "@pinecone-database/pinecone";
import "dotenv/config";

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

export async function getIndex() {
    const indexName = process.env.PINECONE_INDEX_NAME;

    const indexes = await pinecone.listIndexes();

    const exists = indexes.indexes?.some(
        index => index.name === indexName
    );

    if (!exists) {
        await pinecone.createIndex({
            name: indexName,
            dimension: 1536,
            metric: "cosine",
            spec: {
                serverless: {
                    cloud: "aws",
                    region: "us-east-1"
                }
            }
        });

        console.log(`Created Pinecone index: ${indexName}`);

        // Esperar a que el índice esté listo.
        await waitForIndex(indexName);
    }

    return pinecone.index(indexName);
}

async function waitForIndex(indexName) {
    let ready = false;

    while (!ready) {
        const description =
            await pinecone.describeIndex(indexName);

        ready = description.status?.ready;

        if (!ready) {
            console.log("Waiting for Pinecone index...");
            await new Promise(resolve =>
                setTimeout(resolve, 3000)
            );
        }
    }
}