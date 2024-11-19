
import React from "react";

const ReminderCard = ({ reminder }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold">{reminder.name}</h3>
      <p className="text-sm text-gray-600">Dosage: {reminder.dosage}</p>
      <p className="text-sm text-gray-600">Time: {reminder.time}</p>
      <p className="text-sm text-gray-600">Frequency: {reminder.frequency}</p>
    </div>
  );
};

export default ReminderCard;
