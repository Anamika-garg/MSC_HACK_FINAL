import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Set the worker source
GlobalWorkerOptions.workerSrc = pdfWorker;

// Function to get and combine text from the PDF
async function getContent(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async (event) => {
            const typedArray = new Uint8Array(event.target.result);

            try {
                const doc = await getDocument({ data: typedArray }).promise;
                let fullText = '';

                // Loop through all pages of the PDF
                for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
                    const page = await doc.getPage(pageNum);
                    const textContent = await page.getTextContent();

                    // Extract and concatenate text from each item
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n';  // Add line breaks between pages
                }

                resolve(fullText);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

// Main function to call and display the text
async function getItems(file) {
    const fullText = await getContent(file);
    // console.log('Extracted Text:', fullText);  
    // console.log('full' , fullText)
    return fullText;
}

export default getItems;
