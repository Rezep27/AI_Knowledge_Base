import * as exPdf from "./ingestion/extractPdf.js";
import { cleanText } from "./ingestion/cleanText.js";
import {splitIntoPages, splitIntoParagraphs} from "./ingestion/splitText.js";
import { createChunks } from "./ingestion/createChunks.js";

const document = await exPdf.extractPdf("./data/react.pdf");

const pages = splitIntoPages(document.text);



const cleanedPages = pages.map(page => ({
    pdfPage: page.pdfPage,
    text: cleanText(page.text)
}));

const paragraphs = cleanedPages.flatMap(page => {
    const pageParagraphs = splitIntoParagraphs(page.text);
    return pageParagraphs.map(paragraph => ({
        pdfPage: page.pdfPage,
        text: paragraph
    }));
});

const chunks = createChunks(paragraphs, 1000);