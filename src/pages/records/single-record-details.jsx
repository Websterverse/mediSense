// import React, { useState } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useStateContext } from "../../context/index";
// import ReactMarkdown from "react-markdown";
// import FileUploadModal from "./components/file-upload-modal";
// import RecordDetailsHeader from "./components/record-details-header";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

// function SingleRecordDetails() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [processing, setIsProcessing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(
//     state.analysisResult || "",
//   );
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { updateRecord } = useStateContext();

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     console.log("Selected file:", file);
//     setFileType(file.type);
//     setFilename(file.name);
//     setFile(file);
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
//     setUploadSuccess(false);

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

//             const prompt = `Right now You are to act as MediSense, a medical ai chatbot. Your work is to  analyse the medical reports such as blood tests provided to you and provide comprehensive, relevant analysis, along with suggestions and precautions based on the information contained within them. 

// What you must provide is information such as does the report look normal or is there something amiss.
// And if there is something wrong then should we seek doctor advice or it's alright to not seek advice for now.

// You must also check data in the report and tell when to schedule the next checkup.

// You may also tell any future potential issues or diseases that may arise by looking at the report data. (If any)

// You are to also issue a warning at the end of your response stating that all the provided information is to be taken with a grain of salt as there's only so much ai chatbot can do regarding medical analysis.

// You MUST NOT suggest any treatment plans. That's the work of a doctor.

// Your only role is to analyse and provide what's wrong in the report and what it may imply. And suggest if the doctor's advice is necessary or not.
//         `;




//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
//       const text = response.text();
//       setAnalysisResult(text);
//       const updatedRecord = await updateRecord({
//         documentID: state.id,
//         analysisResult: text,
//         kanbanRecords: "",
//       });
//       setUploadSuccess(true);
//       setIsModalOpen(false); // Close the modal after a successful upload
//       setFilename("");
//       setFile(null);
//       setFileType("");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadSuccess(false);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const processTreatmentPlan = async () => {
//     setIsProcessing(true);

//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//     const prompt = `Your role and goal is to be an that will be using this treatment plan ${analysisResult} to create Columns:
//                 - Todo: Tasks that need to be started.  
//                 - Doing: Tasks that are in progress Predict potential health issues based on report analysis.
//                 - Done: Tasks that are completed  Send medicine alerts and reminders based on predictions.

//                 Each task should include a brief and wel structured formatted  description. The tasks should be categorized appropriately based on the stage of the treatment process .
          
//                 Please provide the results in the following  format for easy front-end display no quotating or what so ever just pure the structure below:

//                 {
//                   "columns": [
//                     { "id": "todo", "title": "Todo" },
//                     { "id": "doing", "title": "Work in progress" },
//                     { "id": "done", "title": "Done" }
//                   ],
//                   "tasks": [
//                     { "id": "1", "columnId": "todo", "content": "Example task 1" },
//                     { "id": "2", "columnId": "todo", "content": "Example task 2" },
//                     { "id": "3", "columnId": "doing", "content": "Example task 3" },
//                     { "id": "4", "columnId": "doing", "content": "Example task 4" },
//                     { "id": "5", "columnId": "done", "content": "Example task 5" }
//                   ]
//                 }
                            
//                 `;





//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     const parsedResponse = JSON.parse(text);

//     console.log(text);
//     console.log(parsedResponse);
//     const updatedRecord = await updateRecord({
//       documentID: state.id,
//       kanbanRecords: text,
//     });
//     console.log(updatedRecord);
//     navigate("/screening-schedules", { state: parsedResponse });
//     setIsProcessing(false);
//   };

//   return (
//     <div className="flex flex-wrap gap-[26px]">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
//       >
//         <IconFileUpload />
//         Upload Reports
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         uploadSuccess={uploadSuccess}
//         filename={filename}
//       />
//       <RecordDetailsHeader recordName={state.recordName} />
//       <div className="w-full">
//         <div className="flex flex-col">
//           <div className="-m-1.5 overflow-x-auto">
//             <div className="inline-block min-w-full p-1.5 align-middle">
//               <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-[#13131a]">
//                 <div className="border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
//                     Personalized AI-Driven Treatment Plan
//                   </h2>
//                   <p className="text-sm text-gray-600 dark:text-neutral-400">
//                     A tailored medical strategy leveraging advanced AI insights.
//                   </p>
//                 </div>
//                 <div className="flex w-full flex-col px-6 py-4 text-white">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//                       Analysis Result
//                     </h2>
//                     <div className="space-y-2">
//                       <ReactMarkdown>{analysisResult}</ReactMarkdown>
//                     </div>
//                   </div>
//                   <div className="mt-5 grid gap-2 sm:flex">
//                     <button
//                       type="button"
//                       onClick={processTreatmentPlan}
//                       className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
//                     >
//                       View Treatment plan
//                       <IconChevronRight size={20} />
//                       {processing && (
//                         <IconProgress
//                           size={10}
//                           className="mr-3 h-5 w-5 animate-spin"
//                         />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-neutral-400">
//                       <span className="font-semibold text-gray-800 dark:text-neutral-200"></span>{" "}
//                     </p>
//                   </div>
//                   <div>
//                     <div className="inline-flex gap-x-2"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SingleRecordDetails;



// ------------------------- 2nd ---------------------


// ------------------------------ 3rd ------------------------------------------------


// import React, { useState } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
//   IconSend,
// } from "@tabler/icons-react";

// import { useLocation, useNavigate } from "react-router-dom";
// import { useStateContext } from "../../context/index";
// import ReactMarkdown from "react-markdown";
// import FileUploadModal from "./components/file-upload-modal";
// import RecordDetailsHeader from "./components/record-details-header";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

// function SingleRecordDetails() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [processing, setIsProcessing] = useState(false);
  
//   // Ensure the initial analysis result is correctly initialized
//   const [analysisResult, setAnalysisResult] = useState(
//     state?.analysisResult || "" // Use state if passed, otherwise empty string
//   );
//   const [filename, setFilename] = useState("");
//   const [filetype, setFileType] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   // Chat state
//   const [chatInput, setChatInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([
//     { role: "ai", content: analysisResult || "Please upload a medical report for analysis." }, // Default message based on analysisResult
//   ]);

//   const { updateRecord } = useStateContext();

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFileType(file.type);
//     setFilename(file.name);
//     setFile(file);
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
//     setUploadSuccess(false);

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

//       const prompt = `Analyze the following medical report image.`; // Example prompt
      
//       const result = await model.generateContent([prompt, ...imageParts]);
//       const response = await result.response;
//       const text = response.text();
//       setAnalysisResult(text);

//       // Update chat history with analysis result
//       setChatHistory([...chatHistory, { role: "ai", content: text }]);

//       // Update the record with analysis result
//       const updatedRecord = await updateRecord({
//         documentID: state.id,
//         analysisResult: text,
//         kanbanRecords: "",
//       });

//       setUploadSuccess(true);
//       setIsModalOpen(false);
//       setFilename("");
//       setFile(null);
//       setFileType("");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadSuccess(false);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Handle chat input submission
//   const handleChatSubmit = async () => {
//     if (!chatInput) return;

//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//       const prompt = `User: ${chatInput}\nMediSense AI based on the medical analysis: ${analysisResult}\nResponse:`;

//       const result = await model.generateContent([prompt]);
//       const response = await result.response;
//       const text = response.text();

//       // Update chat history with user input and AI response
//       setChatHistory([
//         ...chatHistory,
//         { role: "user", content: chatInput },
//         { role: "ai", content: text },
//       ]);

//       setChatInput(""); // Clear the input field
//     } catch (error) {
//       console.error("Error in chat:", error);
//     }
//   };

//   const processTreatmentPlan = async () => {
//     setIsProcessing(true);

//     const genAI = new GoogleGenerativeAI(geminiApiKey);

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//     const prompt = `...` // Your treatment plan prompt

//     const result = await model.generateContent([prompt]);
//     const response = await result.response;
//     const text = response.text();
//     const parsedResponse = JSON.parse(text);

//     const updatedRecord = await updateRecord({
//       documentID: state.id,
//       kanbanRecords: text,
//     });

//     navigate("/screening-schedules", { state: parsedResponse });
//     setIsProcessing(false);
//   };

//   return (
//     <div className="flex flex-wrap gap-[26px]">
//       <button
//         type="button"
//         onClick={handleOpenModal}
//         className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
//       >
//         <IconFileUpload />
//         Upload Reports
//       </button>
//       <FileUploadModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onFileChange={handleFileChange}
//         onFileUpload={handleFileUpload}
//         uploading={uploading}
//         uploadSuccess={uploadSuccess}
//         filename={filename}
//       />
//       <RecordDetailsHeader recordName={state.recordName} />
//       <div className="w-full">
//         <div className="flex flex-col">
//           <div className="-m-1.5 overflow-x-auto">
//             <div className="inline-block min-w-full p-1.5 align-middle">
//               <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//                 <div className="border-b border-gray-200 px-6 py-4">
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     Personalized AI-Driven Treatment Plan
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     A tailored medical strategy leveraging advanced AI insights.
//                   </p>
//                 </div>

//                 {/* Chat window */}
//                 <div className="px-6 py-4">
//                   <h2 className="text-lg font-semibold">Chat with AI</h2>
//                   <div className="space-y-2">
//                     {chatHistory.map((message, index) => (
//                       <div
//                         key={index}
//                         className={`${
//                           message.role === "user"
//                             ? "text-right text-blue-600"
//                             : "text-left text-gray-800"
//                         }`}
//                       >
//                         <p>{message.content}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Chat input */}
//                 <div className="flex items-center gap-x-2 px-6 py-4">
//                   <input
//                     type="text"
//                     value={chatInput}
//                     onChange={(e) => setChatInput(e.target.value)}
//                     className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     placeholder="Ask MediSense AI anything..."
//                   />
//                   <button
//                     onClick={handleChatSubmit}
//                     className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
//                   >
//                     <IconSend />
//                     Send
//                   </button>
//                 </div>

//                 <div className="px-6 py-4">
//                   <button
//                     type="button"
//                     onClick={processTreatmentPlan}
//                     disabled={processing}
//                     className="inline-flex items-center gap-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
//                   >
//                     <IconProgress />
//                     {processing ? "Processing..." : "Generate Treatment Plan"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SingleRecordDetails;

// ---------------------------------------------------------------------



// import React, { useState } from "react";
// import {
//   IconChevronRight,
//   IconFileUpload,
//   IconProgress,
// } from "@tabler/icons-react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactMarkdown from "react-markdown";
// import FileUploadModal from "./components/file-upload-modal";
// // import ChatBot from "./components/chat-bot.jsx";
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

//       // Store report and analysis for chatbot use
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
//         <h2 className="text-xl font-semibold">Medical Report Analysis</h2>
//         {analysisResult ? (
//           <div>
//             <ReactMarkdown>{analysisResult}</ReactMarkdown>
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

// -------------------------------------------------
// 4th


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
// import ChatBot from "../chat-bot"; // Assuming ChatBot component exists
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
//         <h2 className="text-xl text-white   font-semibold">Medical Report Analysis</h2>
//         {analysisResult ? (
//           <div>
//             <ReactMarkdown  className={"text-gray-400"} >{analysisResult}</ReactMarkdown>
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


// ---- ?
// final //

import React, { useState, useEffect } from "react";
import {
  IconChevronRight,
  IconFileUpload,
  IconProgress,
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import FileUploadModal from "./components/file-upload-modal";
import ChatBot from "../chat-bot"; // Assuming ChatBot component exists
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

  // Load chat history and analysis result from localStorage on mount
  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");
    const savedAnalysisResult = localStorage.getItem("analysisResult");

    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }

    if (savedAnalysisResult) {
      setAnalysisResult(savedAnalysisResult);
    }
  }, []);

  // Save chat history and analysis result to localStorage whenever they change
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

  const handleFileUpload = async () => {
    setUploading(true);
    const genAI = new GoogleGenerativeAI(geminiApiKey);

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
      const prompt = `You are MediSense, an AI medical assistant. Analyze the following medical report data and provide a detailed response:
        - Is the report normal or abnormal?
        - What health implications could the data suggest?
        - Are there any recommendations for doctor consultation or follow-ups?
        - Suggest precautions and potential future risks based on the data.
        
        Include a warning that the AI analysis should not replace professional medical advice.`;

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      setAnalysisResult(text);

      // Update chat history with the initial analysis
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "Medical report uploaded and analyzed." },
        { role: "assistant", content: text },
      ]);

      setIsModalOpen(false); // Close modal
      setFilename("");
      setFile(null);
      setFileType("");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
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
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
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
                // Customizing how headings are rendered (H1, H2, etc.)
                h1: ({ node, ...props }) => (
                  <h1
                    {...props}
                    className="text-3xl font-bold underline text-green-500 mb-4"
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    {...props}
                    className="text-2xl font-bold underline text-green-500 mb-3"
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    {...props}
                    className="text-xl font-bold underline text-green-500 mb-2"
                  />
                ),
                // Normal paragraph (with white color for the text)
                p: ({ node, ...props }) => (
                  <p
                    {...props}
                    className="text-blue-200 mb-3"
                  />
                ),
                // Handling lists if they exist (bullets or numbers)
                ul: ({ node, ...props }) => (
                  <ul
                    {...props}
                    className="list-disc pl-5 text-red-400 mb-3"
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    {...props}
                    className="list-decimal pl-5 text-purple-500 mb-3"
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    {...props}
                    className="text-white mb-2"
                  />
                ),
                // Handling code blocks (optional)
                code: ({ node, inline, className, children, ...props }) => (
                  <code
                    {...props}
                    className={`bg-gray-800 text-white p-1 rounded-md ${
                      inline ? "text-sm" : "block text-base"
                    }`}
                  >
                    {children}
                  </code>
                ),
              }}
            />
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="mt-4 inline-flex items-center gap-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Ask Follow-Up Questions
            </button>
          </div>
        ) : (
          <p>No analysis available yet. Upload a report to begin.</p>
        )}
      </div>
      {isChatOpen && (
        <ChatBot
          chatHistory={chatHistory}
          onChatSubmit={handleChatSubmit}
        />
      )}
    </div>
  );
}

export default MedicalReportAnalysis;
















