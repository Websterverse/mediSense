import React, { useState } from "react";

const CreateReminderModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    time: "",
    frequency: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", dosage: "", time: "", frequency: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Reminder
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="text"
            name="dosage"
            placeholder="Dosage"
            value={form.dosage}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="text"
            name="frequency"
            placeholder="Frequency (e.g., Daily, Weekly)"
            value={form.frequency}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReminderModal;
