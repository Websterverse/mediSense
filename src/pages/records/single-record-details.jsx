
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
  IconProgress,
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
    // Dynamically extract values based on the analysis result
    const metricPatterns = {
      "Blood Pressure (mmHg)": /Blood Pressure: (\d+\/\d+)/,
      "Cholesterol (mg/dL)": /Cholesterol: (\d+)/,
      "Sugar Levels (mg/dL)": /Sugar Levels: (\d+)/,
    };

    const labels = [];
    const values = [];

    Object.entries(metricPatterns).forEach(([label, regex]) => {
      const match = result.match(regex);
      if (match) {
        labels.push(label);
        values.push(parseFloat(match[1].split("/")[0])); // Handle potential slash-separated values
      }
    });

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
    const MAX_RETRIES = 3; // Maximum number of retry attempts
    const RETRY_DELAY = 2000; // Delay between retries in milliseconds

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

          Include a warning that the AI analysis should not replace professional medical advice.
          For any follow up questions you are to answer in relation to the report data.`;

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
                    className="text-gray-600 list-disc ml-6 mb-1"
                  />
                ),
              }}
            />

            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="mt-4 inline-flex items-center gap-x-2 rounded-lg border bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <IconChevronRight />
              Ask AI for more details
            </button>

            {isChatOpen && (
              <ChatBot
                history={chatHistory}
                onSubmit={handleChatSubmit}
                onClose={() => setIsChatOpen(false)}
              />
            )}

            <div className="mt-8">
              <h2 className="text-xl text-green-500 font-semibold">Health Metrics</h2>
              {chartData ? (
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Health Metrics Analysis",
                      },
                    },
                  }}
                />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
        ) : (
          <p>No analysis available yet. Please upload a medical report.</p>
        )}
      </div>
    </div>
  );
}

export default MedicalReportAnalysis;
