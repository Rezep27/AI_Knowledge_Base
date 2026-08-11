//import {ingestPDF} from "./ingestion/ingest.js";
import {getIndex} from "./pinecone.js"
import { expandContent } from "./retrieval/expandContent.js";
import {Pinecone} from "@pinecone-database/pinecone";
import {search} from "./retrieval/search.js";
import { buildPrompt } from "./Generation/prompt.js";
import { generateAnswer } from "./Generation/generateAnswer.js";


let index = await getIndex();
let question = "How does an Array.map works?"
let results = await search(index, question, 5);

let expandedResults = await expandContent(index, results);

let prompt = buildPrompt(question, expandedResults);

console.log(await generateAnswer(prompt));

