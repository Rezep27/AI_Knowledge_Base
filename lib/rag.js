import {getIndex} from "./pinecone.js"
import { expandContent } from "./retrieval/expandContent.js";
import {search} from "./retrieval/search.js";
import { buildPrompt } from "./Generation/prompt.js";
import { generateAnswer } from "./Generation/generateAnswer.js";

export async function ask(question){

    console.log('Getting Pinecone index ...\n');
    let index = await getIndex();

    console.log('Making semantic retrieval ...\n');
    let results = await search(index, question, 5);

    console.log('Expanding retrieval content ...');
    let expandedResults = await expandContent(index, results);

    console.log('Building prompt');
    let prompt = buildPrompt(question, expandedResults);

    console.log('Generating answer ...');
    let answer = await generateAnswer(prompt);

    return answer;

}