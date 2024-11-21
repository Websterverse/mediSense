import React, { useState } from "react";
import { IconSend } from "@tabler/icons-react";

const ChatBot = ({ chatHistory, onChatSubmit }) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      onChatSubmit(userInput);
      setUserInput(""); // Clear input field after submission
    }
  };

  return (
    <div className="chatbot-container border rounded-lg p-4 w-full min-h-screen flex flex-col">
      <h2 className="text-lg font-semibold text-blue-500 mb-4">
        Chat with MediSense
      </h2>
      <div className="chat-history overflow-y-auto h-100   bg-gray-300 rounded-lg p-3 mb-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              message.role === "user"
                ? "bg-blue-100 text-blue-800 self-end"
                : "bg-white text-gray-800"
            }`}
          >
            <strong className="block text-lg font-bold">
              {message.role === "user" ? "You" : "MediSense"}
            </strong>
            {message.role === "assistant" ? (
              <div className="text-sm">
                {message.content.split("\n").map((line, idx) => {
                  if (line.toLowerCase().includes("risk")) {
                    return (
                      <p key={idx} className=" text-red-500   font-medium">
                        {line}
                      </p>
                    );
                  }
                  if (
                    line.toLowerCase().includes("good") ||
                    line.toLowerCase().includes("positive") ||
                    line.toLowerCase().includes("normal")
                  ) {
                    return (
                      <p key={idx} className="  text-green-500  font-medium">
                        {line}
                      </p>
                    );
                  }
                  return <p key={idx}>{line}</p>;
                })}
              </div>
            ) : (
              <p>{message.content}</p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          className="flex-grow border text-gray-500  rounded-lg p-2"
          placeholder="Ask your question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          title="Send"
        >
          <IconSend />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;