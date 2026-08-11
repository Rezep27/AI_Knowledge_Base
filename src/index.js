//import {ingestPDF} from "./ingestion/ingest.js";
import {getIndex} from "./pinecone.js"
import { expandContent } from "./retrieval/expandContent.js";
import {Pinecone} from "@pinecone-database/pinecone";

let index = await getIndex();
let stats = 0;
try{
    stats = await index.describeIndexStats();
    
}
catch (e){
    console.log(e);
}
console.log("Fetching by id ...");

let chunks = await index.fetch({
    ids: ['LearningReact-000001', 'LearningReact-000002']
});

console.log("Expanding content ...")
let expandedCont = await expandContent(index, chunks);

for (const item of expandedCont){
    console.log(item.metadata.text);
}

