import "dotenv/config";

import {
    TokenTextSplitter
} from "llamaindex";
import { PDFReader } from "@llamaindex/readers/pdf";


export async function ingestPDF(filePath) {
    const reader = new PDFReader();

    const documents = await reader.loadData(
        filePath
    );

    console.log(`Documents loaded: ${documents.length}`);

    const splitter = new TokenTextSplitter({
        chunkSize: 256,
        chunkOverlap: 40
    });

    const nodes = splitter.getNodesFromDocuments(
        documents
    );

    console.log(`Nodes created: ${nodes.length}`);

    let fPath = filePath.split("/");
    let nameSplit = fPath[fPath.length - 1].split(".");
    let name = nameSplit[0];
    let newNodes = []
    for (let i = 1; i <= nodes.length; i++) {
        let node = nodes[i - 1];
        newNodes.push({
            id: `${name}-${i}`,
            content: node.getContent(),
            metadata: node.metadata
        });
    }

    for (const [index, node] of newNodes.slice(115, 120).entries()) {
        console.log("\n==============================");
        console.log(`NODE ${index}`);
        console.log("==============================");
        console.log("ID:");
        console.log(node.id);
        console.log("CONTENT:");
        console.log(node.content);
        console.log("METADATA:");
        console.dir(node.metadata);
    }

    return nodes;
}