//import {ingestPDF} from "./ingestion/ingest.js";
import {getIndex} from "./pinecone.js"
import { expandContent } from "./retrieval/expandContent.js";
import {Pinecone} from "@pinecone-database/pinecone";
import {search} from "./retrieval/search.js";

let index = await getIndex();

let results = await search(index, "How does an Array.map works?", 5);

for (const item of results){
    console.log(`Score: ${item.score} \nText: ${item.metadata.text}`);
}


