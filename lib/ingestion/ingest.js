import {processPDF} from "./readPDF.js";
import {uploadNodes} from "./uploadNodes.js";
import {getIndex} from "../pinecone.js";

export async function ingestPDF(filePath) {
    console.log(`Loading PDF: ${filePath}...\n`);
    const nodes = await processPDF(filePath);

    console.log(`Total nodes to upload: ${nodes.length}\n`);
    console.log("Connecting to Pinecone ...\n")
    const pineconeIndex = await getIndex();

    console.log("Uploading nodes to Pinecone ...\n")
    await uploadNodes(pineconeIndex, nodes);

    console.log("Ingestion complete!");

}