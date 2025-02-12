import React, { useEffect, useState } from 'react';
// import PdfToText from './react-pdftotext-wrapper';
import { useAuth } from '../Context/AuthContext';
import {toast , ToastContainer} from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getItems  from './pdfToText';
// import PdfToText from '../react-pdftotext-wrapper';
// import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';  // Import worker for Vite


// Set the worker source
// GlobalWorkerOptions.workerSrc = pdfWorker;

// import { getDocument } from 'pdfjs-dist';

export default function ResumeReview() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // Track the entire process (upload + API call)
  
  const {isAuthenticated} = useAuth();
  useEffect(()=>{
    if(!isAuthenticated){
      toast.error("Login first!")
      setTimeout(()=>{
        navigate('/login')
      },1200)
    }
  },[])

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setIsProcessing(true);
      // PdfToText(selectedFile)
      //   .then(text => {
        //   })
        //   .catch(error => {
          //     console.error("Failed to extract text from pdf", error);
          //     setIsProcessing(false);
          //   });
          const text = await getItems(selectedFile);
          setData(text);
          // console.log(text)
          setIsProcessing(false);
          return text;
      // console.log(text)
    }
    
  };


  // const extractTextFromPDF = async (file) => {
  //   const pdf = await getDocument(file).promise;
  //   let text = '';

  //   for (let i = 1; i <= pdf.numPages; i++) {
  //     const page = await pdf.getPage(i);
  //     const content = await page.getTextContent();
  //     const pageText = content.items.map(item => item.str).join(' ');
  //     text += pageText + '\n';
  //   }

  //   console.log(text)
  //   return text;
  // };

  // Example usage in your component
 
  async function requestSend() {
    if (!data) {
      alert('Please select a PDF file and wait for text extraction to complete.');
      return;
    }

    setIsProcessing(true); 
    try {
      // console.log('hey');
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_USER_URL}/resumereview`,
        { text: data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );

      const resData = res.data.review.replace(/```/g, " ").trim().replace(/JSON|json/, "");
      // console.log(resData)
      navigate('/resume-review-result', { state: JSON.parse(resData) });
    } catch (err) {
      if (err.response) {
        console.error('Server responded with:', err.response.data);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error:', err.message);
      }
    } finally {
      setIsProcessing(false); // Ensure processing is stopped regardless of success or failure
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Upload Your Resume</h1>

      <div className="bg-purple-50 p-6 rounded-2xl shadow-md w-full max-w-md">
        <label className="block mb-4 text-lg font-medium text-gray-700">
          Choose a PDF File
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold 
                     file:bg-purple-600 file:text-white hover:file:bg-purple-700 
                     cursor-pointer"
        />

        {fileName && (
          <p className="mt-4 text-green-600 font-medium">
            Selected File: <span className="text-gray-800">{fileName}</span>
          </p>
        )}

        <button
          onClick={requestSend}
          disabled={!data || isProcessing}
          className={`mt-6 w-full py-2 px-4 rounded-full text-white font-semibold 
                      ${(!data || isProcessing) ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}
                    `}
        >
          {isProcessing ? 'Processing...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
