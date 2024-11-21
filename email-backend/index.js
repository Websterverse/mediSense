const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./utils/dbConfig'); // Use your existing dbConfig
const { Reminders } = require('./utils/schema'); // Use your schema definitions
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
};

// Generate a "Mark as Done" button
const generateMarkAsDoneButton = (reminderId) => {
  const markAsDoneUrl = `http://localhost:5000/mark-as-done/${reminderId}`;
  return `<a href="${markAsDoneUrl}" style="padding:10px 15px; background-color:#28a745; color:#fff; text-decoration:none; border-radius:5px;">Mark as Done</a>`;
};

// Function to fetch all reminders from the database
const fetchReminders = async () => {
  let retries = 3;
  while (retries > 0) {
    try {
      return await db.select().from(Reminders).execute();
    } catch (error) {
      console.error("Error fetching reminders from database:", error);
      retries--;
      if (retries === 0) throw error;
    }
  }
};

// Function to mark a reminder as done in the database
const markReminderAsDoneInDb = async (id) => {
  try {
    await db
      .update(Reminders)
      .set({ isDone: true })
      .where(Reminders.id.eq(id))
      .execute();
    console.log(`Marked reminder ${id} as done in the database.`);
  } catch (error) {
    console.error(`Error marking reminder ${id} as done:`, error);
  }
};

// Cron job to process reminders
cron.schedule('* * * * *', async () => {
  console.log('Running reminder check...');
  const now = new Date();

  const reminders = await fetchReminders();

  reminders.forEach(async (reminder) => {
    if (reminder.isDone) return;

    const reminderTime = new Date();
    const [hours, minutes] = reminder.time.split(':').map(Number);
    reminderTime.setHours(hours, minutes, 0, 0);

    const timeDiff = reminderTime - now;

    // Send reminder emails at intervals before the reminder time
    if (timeDiff > 0 && timeDiff <= 30 * 60 * 1000) {
      const minutesRemaining = Math.ceil(timeDiff / (60 * 1000));
      sendEmail(
        reminder.createdBy,
        `Reminder: ${reminder.name}`,
        `<p>Your medicine reminder for "${reminder.name}" (${reminder.dosage}) is due in ${minutesRemaining} minutes.</p>
         ${generateMarkAsDoneButton(reminder.id)}`
      );
    }

    // Send overdue emails after the reminder time
    if (timeDiff <= 0) {
      const overdueHours = Math.abs(Math.floor(timeDiff / (60 * 60 * 1000)));
      sendEmail(
        reminder.createdBy,
        `Overdue Reminder: ${reminder.name}`,
        `<p>Your reminder for "${reminder.name}" (${reminder.dosage}) is overdue by ${overdueHours} hours.</p>
         ${generateMarkAsDoneButton(reminder.id)}`
      );
    }
  });
});

// API endpoint to mark a reminder as done
app.get('/mark-as-done/:id', async (req, res) => {
  const reminderId = parseInt(req.params.id, 10);
  try {
    await markReminderAsDoneInDb(reminderId);
    res.send(`<p>Thank you! Your reminder has been marked as done.</p>`);
  } catch (error) {
    res.status(500).send({ message: 'Error marking reminder as done' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});