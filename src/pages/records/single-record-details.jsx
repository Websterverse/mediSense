// import React, { useState, useEffect } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactMarkdown from "react-markdown";
// import FileUploadModal from "./components/file-upload-modal";
// import ChatBot from "../chat-bot"; 
// const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

// function MedicalReportAnalysis() {
//   const { state } = useLocation();
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Load chat history and analysis result from localStorage on mount
//   useEffect(() => {
//     const savedChatHistory = localStorage.getItem("chatHistory");
//     const savedAnalysisResult = localStorage.getItem("analysisResult");

//     if (savedChatHistory) {
//       setChatHistory(JSON.parse(savedChatHistory));
//     }

//     if (savedAnalysisResult) {
//       setAnalysisResult(savedAnalysisResult);
//     }
//   }, []);

//   // Save chat history and analysis result to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   useEffect(() => {
//     localStorage.setItem("analysisResult", analysisResult);
//   }, [analysisResult]);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFileType(selectedFile.type);
//     setFilename(selectedFile.name);
//   };

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileUpload = async () => {
//     setUploading(true);
//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const base64Data = await readFileAsBase64(file);

//       const imageParts = [
//         {
//           inlineData: {
//             data: base64Data,
//             mimeType: filetype,
//           },
//         },
//       ];

//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//       const prompt = `You are MediSense, an AI medical assistant. Analyze the following medical report data and provide a detailed response:
//         - Is the report normal or abnormal?
//         - What health implications could the data suggest?
//         - Are there any recommendations for doctor consultation or follow-ups?
//         - Suggest precautions and potential future risks based on the data.
        
//         Include a warning that the AI analysis should not replace professional medical advice.`;

//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
//       const text = response.text();
//       setAnalysisResult(text);

//       // Update chat history with the initial analysis
//       setChatHistory((prev) => [
//         ...prev,
//         { role: "system", content: "Medical report uploaded and analyzed." },
//         { role: "assistant", content: text },
//       ]);

//       setIsModalOpen(false); // Close modal
//       setFilename("");
//       setFile(null);
//       setFileType("");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleChatSubmit = async (userInput) => {
//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//       const chatPrompt = `
//         You are MediSense, an AI assistant. Based on the uploaded medical report analysis, answer user questions accurately. 
//         Use the following context:
//         ${analysisResult}

//         User query: ${userInput}
//       `;

//       const result = await model.generateContent(chatPrompt);
//       const response = await result.response;
//       const botReply = response.text();

//       setChatHistory((prev) => [
//         ...prev,
//         { role: "user", content: userInput },
//         { role: "assistant", content: botReply },
//       ]);
//     } catch (error) {
//       console.error("Error during chatbot interaction:", error);
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-[26px]">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
//       >
//         <IconFileUpload />
//         Upload Medical Report
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         filename={filename}
//       />
//       <div className="w-full mt-6">
//         <h2 className="text-xl text-green-500 font-semibold">Medical Report Analysis</h2>
//         {analysisResult ? (
//           <div>
//             <ReactMarkdown
//               className="text-blue-100"
//               children={analysisResult}
//               components={{
//                 // Customizing how headings are rendered (H1, H2, etc.)
//                 h1: ({ node, ...props }) => (
//                   <h1
//                     {...props}
//                     className="text-3xl font-bold underline text-green-500 mb-4"
//                   />
//                 ),
//                 h2: ({ node, ...props }) => (
//                   <h2
//                     {...props}
//                     className="text-2xl font-bold underline text-green-500 mb-3"
//                   />
//                 ),
//                 h3: ({ node, ...props }) => (
//                   <h3
//                     {...props}
//                     className="text-xl font-bold underline text-green-500 mb-2"
//                   />
//                 ),
//                 // Normal paragraph (with white color for the text)
//                 p: ({ node, ...props }) => (
//                   <p
//                     {...props}
//                     className="text-blue-200 mb-3"
//                   />
//                 ),
//                 // Handling lists if they exist (bullets or numbers)
//                 ul: ({ node, ...props }) => (
//                   <ul
//                     {...props}
//                     className="list-disc pl-5 text-red-400 mb-3"
//                   />
//                 ),
//                 ol: ({ node, ...props }) => (
//                   <ol
//                     {...props}
//                     className="list-decimal pl-5 text-purple-500 mb-3"
//                   />
//                 ),
//                 li: ({ node, ...props }) => (
//                   <li
//                     {...props}
//                     className="text-white mb-2"
//                   />
//                 ),
//                 // Handling code blocks (optional)
//                 code: ({ node, inline, className, children, ...props }) => (
//                   <code
//                     {...props}
//                     className={`bg-gray-800 text-white p-1 rounded-md ${
//                       inline ? "text-sm" : "block text-base"
//                     }`}
//                   >
//                     {children}
//                   </code>
//                 ),
//               }}
//             />
//             <button
//               type="button"
//               onClick={() => setIsChatOpen(true)}
//               className="mt-4 inline-flex items-center gap-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             >
//               Ask Follow-Up Questions
//             </button>
//           </div>
//         ) : (
//           <p>No analysis available yet. Upload a report to begin.</p>
//         )}
//       </div>
//       {isChatOpen && (
//         <ChatBot
//           chatHistory={chatHistory}
//           onChatSubmit={handleChatSubmit}
//         />
//       )}
//     </div>
//   );
// }

// export default MedicalReportAnalysis;










// import React, { useState, useEffect } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactMarkdown from "react-markdown";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import FileUploadModal from "./components/file-upload-modal";
// import ChatBot from "../chat-bot"; 

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

// function MedicalReportAnalysis() {
//   const { state } = useLocation();
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [chartData, setChartData] = useState(null);

//   // Load chat history and analysis result from localStorage on mount
//   useEffect(() => {
//     const savedChatHistory = localStorage.getItem("chatHistory");
//     const savedAnalysisResult = localStorage.getItem("analysisResult");

//     if (savedChatHistory) {
//       setChatHistory(JSON.parse(savedChatHistory));
//     }

//     if (savedAnalysisResult) {
//       setAnalysisResult(savedAnalysisResult);
//     }
//   }, []);

//   // Save chat history and analysis result to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   useEffect(() => {
//     localStorage.setItem("analysisResult", analysisResult);
//   }, [analysisResult]);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFileType(selectedFile.type);
//     setFilename(selectedFile.name);
//   };

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileUpload = async () => {
//     setUploading(true);
//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const base64Data = await readFileAsBase64(file);

//       const imageParts = [
//         {
//           inlineData: {
//             data: base64Data,
//             mimeType: filetype,
//           },
//         },
//       ];

//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//       const prompt = `You are MediSense, an AI medical assistant. Analyze the following medical report data and provide a detailed response:
//         - Is the report normal or abnormal?
//         - What health implications could the data suggest?
//         - Are there any recommendations for doctor consultation or follow-ups?
//         - Suggest precautions and potential future risks based on the data.
        
//         Include a warning that the AI analysis should not replace professional medical advice.`;

//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
//       const text = response.text();
//       setAnalysisResult(text);

//       // Simulate chart data generation based on the result
//       const mockChartData = {
//         labels: ["Blood Pressure", "Cholesterol", "Sugar Levels"], // Example parameters
//         datasets: [
//           {
//             label: "Health Metrics",
//             data: [120, 180, 140], // Example data; replace with actual parsing of `text`
//             backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//           },
//         ],
//       };
//       setChartData(mockChartData);
      

//       // Update chat history with the initial analysis
//       setChatHistory((prev) => [
//         ...prev,
//         { role: "system", content: "Medical report uploaded and analyzed." },
//         { role: "assistant", content: text },
//       ]);

//       setIsModalOpen(false); // Close modal
//       setFilename("");
//       setFile(null);
//       setFileType("");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleChatSubmit = async (userInput) => {
//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//       const chatPrompt = `
//         You are MediSense, an AI assistant. Based on the uploaded medical report analysis, answer user questions accurately. 
//         Use the following context:
//         ${analysisResult}

//         User query: ${userInput}
//       `;

//       const result = await model.generateContent(chatPrompt);
//       const response = await result.response;
//       const botReply = response.text();

//       setChatHistory((prev) => [
//         ...prev,
//         { role: "user", content: userInput },
//         { role: "assistant", content: botReply },
//       ]);
//     } catch (error) {
//       console.error("Error during chatbot interaction:", error);
//     }
//   };




//   return (
//     <div className="flex      flex-wrap gap-[26px]">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
//       >
//         <IconFileUpload />
//         Upload Medical Report
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         filename={filename}
//       />
//       <div className="w-full mt-6">
//         <h2 className="text-xl text-green-500 font-semibold">Medical Report Analysis</h2>
//         {analysisResult ? (
//           <div>
//             <ReactMarkdown
//               className="text-blue-100"
//               children={analysisResult}
//               components={{
//                 p: ({ node, ...props }) => <p {...props} className="text-blue-200 mb-3" />,
//               }}
//             />
//             <button
//               type="button"
//               onClick={() => setIsChatOpen(true)}
//               className="mt-4 inline-flex items-center gap-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             >
//               Ask Follow-Up Questions
//             </button>
//             {chartData && (
//               <div className="chart-container mt-6">
//                 <Bar  data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>No analysis available yet. Upload a report to begin.</p>
//         )}
//       </div>
//       {isChatOpen && (
//         <ChatBot
//           chatHistory={chatHistory}
//           onChatSubmit={handleChatSubmit}
//         />
//       )}
//     </div>
//   );
// }

// export default MedicalReportAnalysis;







// final try ??// 

// import React, { useState, useEffect } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactMarkdown from "react-markdown";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import FileUploadModal from "./components/file-upload-modal";
// import ChatBot from "../chat-bot"; 

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

// function MedicalReportAnalysis() {
//   const { state } = useLocation();
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [chartData, setChartData] = useState(null);

//   // Restore saved data on mount
//   useEffect(() => {
//     const savedChatHistory = localStorage.getItem("chatHistory");
//     const savedAnalysisResult = localStorage.getItem("analysisResult");
//     const savedChartData = localStorage.getItem("chartData");

//     if (savedChatHistory) setChatHistory(JSON.parse(savedChatHistory));
//     if (savedAnalysisResult) setAnalysisResult(savedAnalysisResult);
//     if (savedChartData) setChartData(JSON.parse(savedChartData));
//   }, []);

//   // Persist chat history and analysis result
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   useEffect(() => {
//     localStorage.setItem("analysisResult", analysisResult);
//   }, [analysisResult]);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFileType(selectedFile.type);
//     setFilename(selectedFile.name);
//   };

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   // Generate chart data dynamically
//   const generateChartData = (result) => {
//     const labels = [ "Blood Pressure (mmHg)",
//       "Cholesterol (mg/dL)",
//       "Sugar Levels (mg/dL)"]; // Example labels
//     const values = result.match(/\d+/g)?.map(Number) || [0, 0, 0]; // Extract numbers
//     return {
//       labels,
//       datasets: [
//         {
//           label: "Health Metrics",
//           data: values,
//           backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         },
//       ],
//     };
//   };

//   const handleFileUpload = async () => {
//     setUploading(true);
//     const genAI = new GoogleGenerativeAI(geminiApiKey);
//     const MAX_RETRIES = 3; // Maximum number of retry attempts
//     const RETRY_DELAY = 2000; // Delay between retries in milliseconds
  
//     const uploadWithRetry = async (retries = MAX_RETRIES) => {
//       try {
//         const base64Data = await readFileAsBase64(file);
  
//         const imageParts = [
//           {
//             inlineData: {
//               data: base64Data,
//               mimeType: filetype,
//             },
//           },
//         ];
  
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//         const prompt = `You are MediSense, an AI medical assistant. Analyze the following medical report data and provide a detailed response:
//           - Is the report normal or abnormal?
//           - What health implications could the data suggest?
//           - Are there any recommendations for doctor consultation or follow-ups?
//           - Suggest precautions and potential future risks based on the data.
  
//           Include a warning that the AI analysis should not replace professional medical advice.`;
  
//         const result = await model.generateContent([prompt, ...imageParts]);
//         const response = await result.response;
//         const text = response.text();
//         setAnalysisResult(text);
  
//         // Generate and save chart data dynamically
//         const dynamicChartData = generateChartData(text);
//         setChartData(dynamicChartData);
//         localStorage.setItem("chartData", JSON.stringify(dynamicChartData));
  
//         // Update chat history
//         setChatHistory((prev) => [
//           ...prev,
//           { role: "system", content: "Medical report uploaded and analyzed." },
//           { role: "assistant", content: text },
//         ]);
  
//         setIsModalOpen(false);
//         setFilename("");
//         setFile(null);
//         setFileType("");
//       } catch (error) {
//         if (retries > 0 && error?.message?.includes("503")) {
//           console.warn(`Retrying... Attempts left: ${retries}`);
//           setTimeout(() => uploadWithRetry(retries - 1), RETRY_DELAY);
//         } else {
//           console.error("Error uploading file:", error);
//           alert("The system is currently overloaded. Please try again later.");
//         }
//       }
//     };
  
//     await uploadWithRetry();
//     setUploading(false);
//   };
  
//   const handleChatSubmit = async (userInput) => {
//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//       const chatPrompt = `
//         You are MediSense, an AI assistant. Based on the uploaded medical report analysis, answer user questions accurately. 
//         Use the following context:
//         ${analysisResult}

//         User query: ${userInput}
//       `;

//       const result = await model.generateContent(chatPrompt);
//       const response = await result.response;
//       const botReply = response.text();

//       setChatHistory((prev) => [
//         ...prev,
//         { role: "user", content: userInput },
//         { role: "assistant", content: botReply },
//       ]);
//     } catch (error) {
//       console.error("Error during chatbot interaction:", error);
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-[26px]">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
//       >
//         <IconFileUpload />
//         Upload Medical Report
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         filename={filename}
//       />
//       <div className="w-full mt-6">
//         <h2 className="text-xl text-green-500 font-semibold">Medical Report Analysis</h2>
//         {analysisResult ? (
//           <div>
//             <ReactMarkdown
//               className="text-blue-100"
//               children={analysisResult}
//               components={{
//                 p: ({ node, ...props }) => <p {...props} className="text-blue-200 mb-3" />,
//               }}
//             />
//             <button
//               type="button"
//               onClick={() => setIsChatOpen(true)}
//               className="mt-4 inline-flex items-center gap-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             >
//               Ask Follow-Up Questions
//             </button>
//             {chartData && (
//               <div className="chart-container h-[500px]  mt-6">
//                 <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>No analysis available yet. Upload a report to begin.</p>
//         )}
//       </div>
//       {isChatOpen && (
//         <ChatBot
//           chatHistory={chatHistory}
//           onChatSubmit={handleChatSubmit}
//         />
//       )}
//     </div>
//   );
// }

// export default MedicalReportAnalysis;










// import React, { useState, useEffect } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactMarkdown from "react-markdown";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import FileUploadModal from "./components/file-upload-modal";
// import ChatBot from "../chat-bot"; 

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

// function MedicalReportAnalysis() {
//   const { state } = useLocation();
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [chartData, setChartData] = useState(null);

//   // Restore saved data on mount
//   useEffect(() => {
//     const savedChatHistory = localStorage.getItem("chatHistory");
//     const savedAnalysisResult = localStorage.getItem("analysisResult");
//     const savedChartData = localStorage.getItem("chartData");

//     if (savedChatHistory) setChatHistory(JSON.parse(savedChatHistory));
//     if (savedAnalysisResult) setAnalysisResult(savedAnalysisResult);
//     if (savedChartData) setChartData(JSON.parse(savedChartData));
//   }, []);

//   // Persist chat history and analysis result
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   useEffect(() => {
//     localStorage.setItem("analysisResult", analysisResult);
//   }, [analysisResult]);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFileType(selectedFile.type);
//     setFilename(selectedFile.name);
//   };

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   // Generate chart data dynamically
//   const generateChartData = (result) => {
//     const metrics = {
//       "Blood Pressure (mmHg)": 120, // Default value if no match
//       "Cholesterol (mg/dL)": 180,
//       "Sugar Levels (mg/dL)": 95,
//     };

//     Object.keys(metrics).forEach((metric) => {
//       const regex = new RegExp(`${metric}:\\s?(\\d+)`, "i");
//       const match = result.match(regex);
//       if (match) {
//         metrics[metric] = parseInt(match[1]);
//       }
//     });

//     return {
//       labels: Object.keys(metrics),
//       datasets: [
//         {
//           label: "Health Metrics",
//           data: Object.values(metrics),
//           backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         },
//       ],
//     };
//   };

//   const handleFileUpload = async () => {
//     setUploading(true);
//     const genAI = new GoogleGenerativeAI(geminiApiKey);
//     const MAX_RETRIES = 3; // Maximum number of retry attempts
//     const RETRY_DELAY = 2000; // Delay between retries in milliseconds
  
//     const uploadWithRetry = async (retries = MAX_RETRIES) => {
//       try {
//         const base64Data = await readFileAsBase64(file);
  
//         const imageParts = [
//           {
//             inlineData: {
//               data: base64Data,
//               mimeType: filetype,
//             },
//           },
//         ];
  
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//         const prompt = `You are MediSense, an AI medical assistant. Analyze the following medical report data and provide a detailed response in a well-structured markdown format:
//           - Is the report normal or abnormal?
//           - What health implications could the data suggest?
//           - Are there any recommendations for doctor consultation or follow-ups?
//           - Suggest precautions and potential future risks based on the data.
  
//           Include a warning that the AI analysis should not replace professional medical advice.`;
  
//         const result = await model.generateContent([prompt, ...imageParts]);
//         const response = await result.response;
//         const text = response.text();
//         setAnalysisResult(text);
  
//         // Generate and save chart data dynamically
//         const dynamicChartData = generateChartData(text);
//         setChartData(dynamicChartData);
//         localStorage.setItem("chartData", JSON.stringify(dynamicChartData));
  
//         // Update chat history
//         setChatHistory((prev) => [
//           ...prev,
//           { role: "system", content: "Medical report uploaded and analyzed." },
//           { role: "assistant", content: text },
//         ]);
  
//         setIsModalOpen(false);
//         setFilename("");
//         setFile(null);
//         setFileType("");
//       } catch (error) {
//         if (retries > 0 && error?.message?.includes("503")) {
//           console.warn(`Retrying... Attempts left: ${retries}`);
//           setTimeout(() => uploadWithRetry(retries - 1), RETRY_DELAY);
//         } else {
//           console.error("Error uploading file:", error);
//           alert("The system is currently overloaded. Please try again later.");
//         }
//       }
//     };
  
//     await uploadWithRetry();
//     setUploading(false);
//   };
  
//   const handleChatSubmit = async (userInput) => {
//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//       const chatPrompt = `
//         You are MediSense, an AI assistant. Based on the uploaded medical report analysis, answer user questions accurately. 
//         Use the following context:
//         ${analysisResult}

//         User query: ${userInput}
//       `;

//       const result = await model.generateContent(chatPrompt);
//       const response = await result.response;
//       const botReply = response.text();

//       setChatHistory((prev) => [
//         ...prev,
//         { role: "user", content: userInput },
//         { role: "assistant", content: botReply },
//       ]);
//     } catch (error) {
//       console.error("Error during chatbot interaction:", error);
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-[26px]">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
//       >
//         <IconFileUpload />
//         Upload Medical Report
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         filename={filename}
//       />
//       <div className="w-full mt-6">
//         <h2 className="text-xl text-green-500 font-semibold">Medical Report Analysis</h2>
//         {analysisResult ? (
//           <div>

// <ReactMarkdown
//   className="text-blue-100"
//   children={analysisResult}
//   components={{
//     h1: ({ node, ...props }) => (
//       <h1
//         {...props}
//         className="text-yellow-400 text-2xl font-bold mb-4"
//       />
//     ),
//     h2: ({ node, ...props }) => (
//       <h2
//         {...props}
//         className="text-green-400 text-xl font-semibold mb-3"
//       />
//     ),
//     h3: ({ node, ...props }) => (
//       <h3
//         {...props}
//         className="text-purple-400 text-lg font-medium mb-2"
//       />
//     ),
//     p: ({ node, ...props }) => (
//       <p
//         {...props}
//         className="text-gray-700 mb-2"
//       />
//     ),
//     li: ({ node, ...props }) => (
//       <li
//         {...props}
//         className="text-gray-600 list-disc ml-6 mb-1"
//       />
//     ),
//   }}
// />


//             <button
//               type="button"
//               onClick={() => setIsChatOpen(true)}
//               className="mt-4 inline-flex items-center gap-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             >
//               Ask Follow-Up Questions
//             </button>
//             {chartData && (
//               <div className="chart-container h-[500px] mt-6">
//                 <Bar data={chartData} options={{ responsive: true }} />
//               </div>
//             )}
//           </div>
//         ) : (
//           <p className="text-gray-500">No report analyzed yet.</p>
//         )}
//       </div>
//       {isChatOpen && <ChatBot onSubmit={handleChatSubmit} chatHistory={chatHistory} />}
//     </div>
//   );
// }

// export default MedicalReportAnalysis;




// import React, { useState, useEffect } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactMarkdown from "react-markdown";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import FileUploadModal from "./components/file-upload-modal";
// import ChatBot from "../chat-bot";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

// function MedicalReportAnalysis() {
//   const { state } = useLocation();
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [chartData, setChartData] = useState(null);

//   // Restore saved data on mount
//   useEffect(() => {
//     const savedChatHistory = localStorage.getItem("chatHistory");
//     const savedAnalysisResult = localStorage.getItem("analysisResult");
//     const savedChartData = localStorage.getItem("chartData");

//     if (savedChatHistory) setChatHistory(JSON.parse(savedChatHistory));
//     if (savedAnalysisResult) setAnalysisResult(savedAnalysisResult);
//     if (savedChartData) setChartData(JSON.parse(savedChartData));
//   }, []);

//   // Persist chat history and analysis result
//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   useEffect(() => {
//     localStorage.setItem("analysisResult", analysisResult);
//   }, [analysisResult]);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFileType(selectedFile.type);
//     setFilename(selectedFile.name);
//   };

//   const readFileAsBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };



//   const generateChartData = (result) => {
//         const labels = [ "Blood Pressure (mmHg)",
//            "Cholesterol (mg/dL)",
//            "Sugar Levels (mg/dL)"]; // Example labels
//          const values = result.match(/\d+/g)?.map(Number) || [0, 0, 0]; // Extract numbers
//          return {
//            labels,
//            datasets: [
//              {
//                label: "Health Metrics",
//                data: values,
//               backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//              },
//            ],
//          };
//        };
    



//   const handleFileUpload = async () => {
//     setUploading(true);
//     const genAI = new GoogleGenerativeAI(geminiApiKey);
//     const MAX_RETRIES = 3; // Maximum number of retry attempts
//     const RETRY_DELAY = 2000; // Delay between retries in milliseconds

//     const uploadWithRetry = async (retries = MAX_RETRIES) => {
//       try {
//         const base64Data = await readFileAsBase64(file);

//         const imageParts = [
//           {
//             inlineData: {
//               data: base64Data,
//               mimeType: filetype,
//             },
//           },
//         ];

//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//         const prompt = `You are MediSense, an AI medical assistant. Analyze the following medical report data and provide a detailed response in a well-structured markdown format:
//           - Is the report normal or abnormal?
//           - What health implications could the data suggest?
//           - Are there any recommendations for doctor consultation or follow-ups?
//           - Suggest precautions and potential future risks based on the data.

//           Include a warning that the AI analysis should not replace professional medical advice.
//           For any follow up questions you are to answer in relation to the report data.`;

//         const result = await model.generateContent([prompt, ...imageParts]);
//         const response = await result.response;
//         const text = response.text();
//         setAnalysisResult(text);

//         // Generate and save chart data dynamically
//         const dynamicChartData = generateChartData(text);
//         setChartData(dynamicChartData);
//         localStorage.setItem("chartData", JSON.stringify(dynamicChartData));

//         // Update chat history
//         setChatHistory((prev) => [
//           ...prev,
//           { role: "system", content: "Medical report uploaded and analyzed." },
//           { role: "assistant", content: text },
//         ]);

//         setIsModalOpen(false);
//         setFilename("");
//         setFile(null);
//         setFileType("");
//       } catch (error) {
//         if (retries > 0 && error?.message?.includes("503")) {
//           console.warn(`Retrying... Attempts left: ${retries}`);
//           setTimeout(() => uploadWithRetry(retries - 1), RETRY_DELAY);
//         } else {
//           console.error("Error uploading file:", error);
//           alert("The system is currently overloaded. Please try again later.");
//         }
//       }
//     };

//     await uploadWithRetry();
//     setUploading(false);
//   };

//   const handleChatSubmit = async (userInput) => {
//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//       const chatPrompt = `
//         You are MediSense, an AI assistant. Based on the uploaded medical report analysis, answer user questions accurately. 
//         Use the following context:
//         ${analysisResult}

//         User query: ${userInput}
//       `;

//       const result = await model.generateContent(chatPrompt);
//       const response = await result.response;
//       const botReply = response.text();

//       setChatHistory((prev) => [
//         ...prev,
//         { role: "user", content: userInput },
//         { role: "assistant", content: botReply },
//       ]);
//     } catch (error) {
//       console.error("Error during chatbot interaction:", error);
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-[26px]">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
//       >
//         <IconFileUpload />
//         Upload Medical Report
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         filename={filename}
//       />
//       <div className="w-full mt-6">
//         <h2 className="text-xl text-green-500 font-semibold">Medical Report Analysis</h2>
//         {analysisResult ? (
//           <div>
//             <ReactMarkdown
//               className="text-blue-100"
//               children={analysisResult}
//               components={{
//                 h1: ({ node, ...props }) => (
//                   <h1
//                     {...props}
//                     className="text-yellow-400 text-2xl font-bold mb-4"
//                   />
//                 ),
//                 h2: ({ node, ...props }) => (
//                   <h2
//                     {...props}
//                     className="text-green-400 text-xl font-semibold mb-3"
//                   />
//                 ),
//                 h3: ({ node, ...props }) => (
//                   <h3
//                     {...props}
//                     className="text-purple-400 text-lg font-medium mb-2"
//                   />
//                 ),
//                 p: ({ node, ...props }) => (
//                   <p
//                     {...props}
//                     className="text-gray-700 mb-2"
//                   />
//                 ),
//                 li: ({ node, ...props }) => (
//                   <li
//                     {...props}
//                     className="text-gray-600 list-disc ml-6 mb-1"
//                   />
//                 ),
//               }}
//             />

//             <button
//               type="button"
//               onClick={() => setIsChatOpen(true)}
//               className="mt-4 inline-flex items-center gap-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             >
//               Ask Follow-Up Questions
//             </button>
//           </div>
//         ) : (
//           <p className="mt-4 text-gray-600">
//             Upload a medical report for detailed analysis.
//           </p>
//         )}
//       </div>
//       {isChatOpen && (
//         <ChatBot onChatSubmit={handleChatSubmit} chatHistory={chatHistory} />
//       )}
//       {chartData && (
//         <div className="mt-6 h-[400px] ">
//           <h3 className="text-xl font-semibold">Health Metrics</h3>
//           <Bar  className="h-[300px]"  data={chartData} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default MedicalReportAnalysis;



import React, { useState, useEffect } from "react";
import {
  IconChevronRight,
  IconFileUpload,
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import FileUploadModal from "./components/file-upload-modal";
import ChatBot from "../chat-bot";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

function MedicalReportAnalysis() {
  const { state } = useLocation();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [filename, setFilename] = useState("");
  const [filetype, setFileType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState(null);

  // Restore saved data on mount
  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");
    const savedAnalysisResult = localStorage.getItem("analysisResult");
    const savedChartData = localStorage.getItem("chartData");

    if (savedChatHistory) setChatHistory(JSON.parse(savedChatHistory));
    if (savedAnalysisResult) setAnalysisResult(savedAnalysisResult);
    if (savedChartData) setChartData(JSON.parse(savedChartData));
  }, []);

  // Persist chat history and analysis result
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem("analysisResult", analysisResult);
  }, [analysisResult]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(selectedFile.type);
    setFilename(selectedFile.name);
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const generateChartData = (result) => {
    const metrics = {
      "Blood Pressure (mmHg)": /Blood Pressure:\s*(\d+\/\d+)/i, // Match blood pressure in "120/80" format
      "Cholesterol (mg/dL)": /Cholesterol:\s*(\d+)/i, // Match cholesterol values
      "Sugar Levels (mg/dL)": /Sugar Levels:\s*(\d+)/i, // Match sugar levels
    };

    const labels = [];
    const values = [];

    // Extract data dynamically based on metrics
    for (const [label, regex] of Object.entries(metrics)) {
      const match = result.match(regex);
      if (match) {
        labels.push(label);

        // Handle special cases like "Blood Pressure" (e.g., "120/80")
        if (label === "Blood Pressure (mmHg)" && match[1]) {
          const [systolic, diastolic] = match[1].split("/").map(Number);
          values.push((systolic + diastolic) / 2); // Average for visualization
        } else {
          values.push(Number(match[1]));
        }
      }
    }

    return {
      labels,
      datasets: [
        {
          label: "Health Metrics",
          data: values,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  };

  const handleFileUpload = async () => {
    setUploading(true);
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;

    const uploadWithRetry = async (retries = MAX_RETRIES) => {
      try {
        const base64Data = await readFileAsBase64(file);

        const imageParts = [
          {
            inlineData: {
              data: base64Data,
              mimeType: filetype,
            },
          },
        ];

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `You are MediSense, an AI medical assistant. Analyze the following medical report data and provide a detailed response in a well-structured markdown format:
          - Is the report normal or abnormal?
          - What health implications could the data suggest?
          - Are there any recommendations for doctor consultation or follow-ups?
          - Suggest precautions and potential future risks based on the data.

          Include a warning that the AI analysis should not replace professional medical advice.`;

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();
        setAnalysisResult(text);

        // Generate and save chart data dynamically
        const dynamicChartData = generateChartData(text);
        setChartData(dynamicChartData);
        localStorage.setItem("chartData", JSON.stringify(dynamicChartData));

        // Update chat history
        setChatHistory((prev) => [
          ...prev,
          { role: "system", content: "Medical report uploaded and analyzed." },
          { role: "assistant", content: text },
        ]);

        setIsModalOpen(false);
        setFilename("");
        setFile(null);
        setFileType("");
      } catch (error) {
        if (retries > 0 && error?.message?.includes("503")) {
          console.warn(`Retrying... Attempts left: ${retries}`);
          setTimeout(() => uploadWithRetry(retries - 1), RETRY_DELAY);
        } else {
          console.error("Error uploading file:", error);
          alert("The system is currently overloaded. Please try again later.");
        }
      }
    };

    await uploadWithRetry();
    setUploading(false);
  };

  const handleChatSubmit = async (userInput) => {
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const chatPrompt = `
        You are MediSense, an AI assistant. Based on the uploaded medical report analysis, answer user questions accurately. 
        Use the following context:
        ${analysisResult}

        User query: ${userInput}
      `;

      const result = await model.generateContent(chatPrompt);
      const response = await result.response;
      const botReply = response.text();

      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: userInput },
        { role: "assistant", content: botReply },
      ]);
    } catch (error) {
      console.error("Error during chatbot interaction:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-[26px]">
      <button
        type="button"
        onClick={handleOpenModal}
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
      >
        <IconFileUpload />
        Upload Medical Report
      </button>
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFileChange={handleFileChange}
        onFileUpload={handleFileUpload}
        uploading={uploading}
        filename={filename}
      />
      <div className="w-full mt-6">
        <h2 className="text-xl text-green-500 font-semibold">Medical Report Analysis</h2>
        {analysisResult ? (
          <div>
            <ReactMarkdown
              className="text-blue-100"
              children={analysisResult}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    {...props}
                    className="text-yellow-400 text-2xl font-bold mb-4"
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    {...props}
                    className="text-green-400 text-xl font-semibold mb-3"
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    {...props}
                    className="text-purple-400 text-lg font-medium mb-2"
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    {...props}
                    className="text-gray-700 mb-2"
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    {...props}
                    className="list-disc ml-5 text-gray-800 mb-1"
                  />
                ),
              }}
            />
            {chartData && (
              <div className="mt-6 h-[400px]">
                <h3 className="text-xl font-semibold">Health Metrics</h3>
                <Bar className="h-[300px]" data={chartData} />
              </div>
            )}
          </div>
        ) : (
          <p>No analysis available. Please upload a report.</p>
        )}
      </div>
      <ChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        history={chatHistory}
        onSubmit={handleChatSubmit}
      />
    </div>
  );
}

export default MedicalReportAnalysis;




