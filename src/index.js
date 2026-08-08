import * as exPdf from "./ingestion/extractPdf.js";

const document = await exPdf.extractPdf("./data/react.pdf");

console.log(document.pages);