
import React, { useState, useEffect } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useStateContext } from "../../context/index";
import CreateReminderModal from "./components/create-reminder-modal";
import ReminderCard from "./components/reminder-card";

const MedicineReminders = () => {
  const { reminders, fetchReminders, createReminder } = useStateContext();
  const [userReminders, setUserReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReminders(); // Fetch all reminders for the user
  }, [fetchReminders]);

  useEffect(() => {
    setUserReminders(reminders); // Update local reminders when context updates
  }, [reminders]);

  const handleCreateReminder = async (formData) => {
    await createReminder(formData); // API call to create a new reminder
    fetchReminders(); // Refresh reminders list
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Medicine Reminders</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition flex items-center"
        >
          <IconCirclePlus size={20} className="mr-2" />
          Add Reminder
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userReminders.map((reminder) => (
          <ReminderCard key={reminder.id} reminder={reminder} />
        ))}
      </div>

      {isModalOpen && (
        <CreateReminderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateReminder}
        />
      )}
    </div>
  );
};

export default MedicineReminders;
