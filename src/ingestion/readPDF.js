import "dotenv/config";

import {
    TokenTextSplitter
} from "llamaindex";
import { PDFReader } from "@llamaindex/readers/pdf";


export async function processPDF(filePath) {
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
    let fileNameSplit = fPath[fPath.length - 1].split(".");
    let fileName = fileNameSplit[0];
    let name = fileName.split(/(?=[A-Z])/).join(" ");
    let newNodes = []
    let nodesLength = nodes.length
    let nodeIndex = 1;
    for (let i = 1; i <= nodesLength; i++) {
        let node = nodes[nodeIndex - 1];
        nodeIndex++;
        if (node.getContent() == ""){
            i--;
            nodesLength--;
            continue;
        }
        newNodes.push({
            id: `${fileName}-${String(i).padStart(6, "0")}`,
            content: node.getContent(),
            metadata: {
                source: name,
                page: node.metadata.page_number,
                fileName: node.metadata.file_name,
                totalPages: node.metadata.total_pages
            }
        });
    }

    return newNodes;
}