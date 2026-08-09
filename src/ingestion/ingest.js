import "dotenv/config";

import {
    SentenceSplitter
} from "llamaindex";
import { PDFReader } from "@llamaindex/readers/pdf";


export async function ingestPDF(filePath) {
    const reader = new PDFReader();

    const documents = await reader.loadData(
        filePath
    );

    console.log(`Documents loaded: ${documents.length}`);

    const splitter = new SentenceSplitter({
        chunkSize: 512,
        chunkOverlap: 50
    });

    const nodes = splitter.getNodesFromDocuments(
        documents
    );

    console.log(`Nodes created: ${nodes.length}`);

    for (const [index, node] of nodes.slice(115, 120).entries()) {
        console.log("\n==============================");
        console.log(`NODE ${index}`);
        console.log("==============================");
        console.log(node.getContent());
        console.log("METADATA:");
        console.dir(node.metadata);
    }

    return nodes;
}