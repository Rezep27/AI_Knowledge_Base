import {createEmbeddings} from "./embeddings.js";

const BATCH_SIZE = 50;

export async function uploadNodes(pineconeIndex, nodes){
    for (let i = 0; i < nodes.length; i += BATCH_SIZE) {
        const batch = nodes.slice(i, i + BATCH_SIZE);

        console.log(`Processing ${i + 1}-${i + batch.length} of ${nodes.length} nodes...`);
        
        const embeddings = await createEmbeddings(batch.map(node => String(node.content)));

        const vectors = batch.map((node, index) => ({
            id: node.id,

            values: embeddings[index],

            metadata: {
                ...node.metadata,
                text: String(node.content)
            }
        }));

        if (vectors.length > 0) {
            console.log("Uploading batch ...");
            await pineconeIndex.upsert({records: vectors});
        }
    }
}