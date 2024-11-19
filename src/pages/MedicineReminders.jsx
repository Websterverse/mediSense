
import { IconCircle, IconCirclePlus } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';

const MedicineReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [form, setForm] = useState({ name: '', dosage: '', time: '', frequency: '' });

  useEffect(() => {
    // Fetch reminders from the backend (API call)
    fetch('/api/reminders')
      .then((res) => res.json())
      .then((data) => setReminders(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      const newReminder = await response.json();
      setReminders([...reminders, newReminder]);
      setForm({ name: '', dosage: '', time: '', frequency: '' });
    }
  };

  const markAsDone = async (id) => {
    await fetch(`/api/reminders/${id}/done`, { method: 'PATCH' });
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div>
      <h1>Medicine Reminders</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Medicine Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Dosage"
          value={form.dosage}
          onChange={(e) => setForm({ ...form, dosage: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <select
          value={form.frequency}
          onChange={(e) => setForm({ ...form, frequency: e.target.value })}
          required
        >
          <option value="">Select Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button 
          className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
          type="submit">
          <IconCirclePlus />
          Add Reminder
        </button>
      </form>

      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            {reminder.name} - {reminder.dosage} at {reminder.time} ({reminder.frequency})
            <button onClick={() => markAsDone(reminder.id)}>Mark as Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineReminders;
