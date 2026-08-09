import * as exPdf from "./ingestion/extractPdf.js";
import { cleanText } from "./ingestion/cleanText.js";

const document = await exPdf.extractPdf("./data/react.pdf");

const cleanedText = cleanText(document.text);
