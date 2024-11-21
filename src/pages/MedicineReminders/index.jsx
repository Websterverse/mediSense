import React, { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../../context/index";
import CreateReminderModal from "./components/create-reminder-modal";
import ReminderCard from "./components/reminder-card";

const formatTime = (timeString) => {
  if (!timeString) return "Invalid Time";

  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert to 12-hour format
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const validateReminder = (reminder) => {
  const requiredFields = ["id", "name", "dosage", "time", "frequency", "createdBy", "createdAt"];
  const missingFields = requiredFields.filter((field) => !reminder[field]);

  if (missingFields.length > 0) {
    console.warn("Invalid reminder data, missing fields:", missingFields, reminder);
    return false;
  }

  return true;
};


const MedicineReminders = ({ darkMode }) => {
  const { user } = usePrivy();
  const {
    reminders,
    fetchReminders,
    createReminder,
    deleteReminder,
    markReminderAsDone,
  } = useStateContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupReminder, setPopupReminder] = useState(null);

  useEffect(() => {
    if (user) {
      fetchReminders();
    }
  }, [user, fetchReminders]);

  useEffect(() => {
    if (reminders.length === 0) return;
  
    console.log("Reminders:", reminders);
  
    const now = new Date();
  
    const validReminders = reminders.filter(validateReminder);
    console.log("Valid reminders:", validReminders);
  
    const upcomingReminder = validReminders.find((reminder) => {
      const reminderTime = new Date();
      const [hours, minutes] = reminder.time.split(":").map(Number);
      reminderTime.setHours(hours, minutes, 0, 0);
  
      const createdAtTime = new Date(reminder.createdAt).getTime();
      if (now.getTime() - createdAtTime < 10000) {
        console.log("Skipping newly created reminder:", reminder);
        return false;
      }
  
      return (
        !reminder.isDone &&
        reminderTime > now &&
        reminderTime - now <= 3600000 // Less than or equal to 1 hour
      );
    });
  
    const overdueReminder = validReminders.find((reminder) => {
      const reminderTime = new Date();
      const [hours, minutes] = reminder.time.split(":").map(Number);
      reminderTime.setHours(hours, minutes, 0, 0);
  
      return !reminder.isDone && reminderTime < now;
    });
  
    if (overdueReminder) {
      console.log("Setting overdue reminder popup:", overdueReminder);
      setPopupReminder({ ...overdueReminder, status: "overdue" });
      return;
    }
  
    if (upcomingReminder) {
      console.log("Setting upcoming reminder popup:", upcomingReminder);
      setPopupReminder({ ...upcomingReminder, status: "upcoming" });
      return;
    }
  
    console.log("No reminders need a popup.");
  }, [reminders]);  

  const handleDelete = async (id) => {
    await deleteReminder(id);
    setPopupReminder(null);
  };

  const handleMarkDone = async (id) => {
    await markReminderAsDone(id);
    setPopupReminder(null);
  };

  const handleDismiss = () => {
    setPopupReminder(null);
  };

  const handleCreateReminder = async (formData) => {
    const email = user?.email?.address || "default_user@example.com";
    await createReminder({ ...formData, createdBy: email });
    fetchReminders();
  };

  return (
    <div className={`p-8 bg-gray-100 min-h-screen ${darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-green-50"}`}>
      <div className={`flex justify-between items-center mb-6 ${darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-green-50"}`}>
        <h1 className="text-2xl font-bold text-blue-600">Medicine Reminders</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition00"
        >
          Add Reminder
        </button>
      </div>

      {popupReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md">
            <h3 className="text-lg font-bold">
              {popupReminder.status === "overdue"
                ? "Reminder Overdue!"
                : "Reminder Approaching!"}
            </h3>
            <p>{popupReminder.name}</p>
            <p>Time: {formatTime(popupReminder.time)}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Dismiss
              </button>
              <button
                onClick={() => handleMarkDone(popupReminder.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Mark as Done
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
        {reminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onDelete={handleDelete}
            onMarkDone={handleMarkDone}
          />
        ))}
      </div>

      <CreateReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateReminder}
      />
    </div>
  );
};

export default MedicineReminders;
