import fs from "fs/promises";
import { PDFParse} from "pdf-parse";

export async function extractPdf(filePath){
    const buffer = await fs.readFile(filePath);

    const parser = new PDFParse({ data: buffer });
    
    const textResult = await parser.getText();
    const infoResult = await parser.getInfo({ parsePageInfo: true });


    return {
            text: textResult.text,
            pages: infoResult.total,
    };
    
    await parser.destroy();
    
}