
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
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Add New Reminder</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded-md"
            required
          />
          <input
            type="text"
            name="dosage"
            placeholder="Dosage"
            value={form.dosage}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded-md"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded-md"
            required
          />
          <input
            type="text"
            name="frequency"
            placeholder="Frequency"
            value={form.frequency}
            onChange={handleChange}
            className="border p-2 w-full mb-4 rounded-md"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
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
