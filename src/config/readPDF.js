
import fs from 'fs/promises';
import * as PDFJS from 'pdfjs-dist';

const readPDF = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);
    const loadingTask = PDFJS.getDocument(new Uint8Array(data));

    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let pdfText = '';

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      pdfText += textContent.items.map((item) => item.str + ' ').join('\n');
    }

    return pdfText;
  } catch (error) {
    throw error;
  }
};

export { readPDF };
