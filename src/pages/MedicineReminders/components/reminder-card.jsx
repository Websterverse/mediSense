import React from "react";

// Helper function to format time into 12-hour format
const formatTime = (timeString) => {
  if (!timeString) return "Invalid Time";

  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert to 12-hour format
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const ReminderCard = ({ reminder, onDelete, onMarkDone }) => {
  const formattedTime = formatTime(reminder.time);
  return (
    <div
      className={`p-4 rounded-md shadow-md ${
        reminder.isDone ? "bg-green-100" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-bold">{reminder.name}</h3>
      <p className="text-sm text-gray-600">Dosage: {reminder.dosage}</p>
      <p className="text-sm text-gray-600">Time: {formattedTime}</p>
      <p className="text-sm text-gray-600">Frequency: {reminder.frequency}</p>
      <div className="mt-4 flex justify-between">
        {!reminder.isDone && (
          <button
            onClick={() => onMarkDone(reminder.id)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Mark as Done
          </button>
        )}
        <button
          onClick={() => onDelete(reminder.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReminderCard;
