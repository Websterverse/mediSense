import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../../context/index";
import { IconCirclePlus } from "@tabler/icons-react";
import CreateReminderModal from "./components/create-reminder-modal";
import ReminderCard from "./components/reminder-card";

const MedicineReminders = () => {
  const { user } = usePrivy(); // Access user details
  const { reminders, fetchReminders, createReminder, fetchUserByEmail } = useStateContext();
  const [userReminders, setUserReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address); // Fetch user details using email
      fetchReminders(); // Fetch all reminders
    }
  }, [user, fetchUserByEmail, fetchReminders]);

  useEffect(() => {
    setUserReminders(reminders); // Update local reminders when context updates
  }, [reminders]);

  const handleCreateReminder = async (formData) => {
    try {
      // Use email as createdBy
      const email = user?.email?.address || "default_user@example.com"; // Default fallback
      await createReminder({
        ...formData,
        createdBy: email, // Set createdBy to user's email
      });
      fetchReminders(); // Refresh reminders list
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-600">
          Medicine Reminders
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition flex items-center"
        >
          <IconCirclePlus size={24} className="mr-2" />
          Add Reminder
        </button>
      </div>

      {/* Reminder Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userReminders.length > 0 ? (
          userReminders.map((reminder) => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No reminders yet. Click "Add Reminder" to create one!
          </p>
        )}
      </div>

      {/* Modal */}  
      <CreateReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateReminder}
      />
    </div>
  );
};

export default MedicineReminders;
