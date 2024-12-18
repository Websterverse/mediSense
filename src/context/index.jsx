
import React, { createContext, useContext, useState, useCallback } from "react";
import { db } from "../utils/dbConfig"; // Adjust the path to your dbConfig
import { Users, Records, Reminders } from "../utils/schema"; // Adjust the path to your schema definitions
import { eq } from "drizzle-orm";

// Create a context
const StateContext = createContext();

// Provider component
export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      const result = await db.select().from(Users).execute();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  // Function to fetch user details by email
  const fetchUserByEmail = useCallback(async (email) => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.createdBy, email))
        .execute();
      if (result.length > 0) {
        setCurrentUser(result[0]);
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  }, []);

  // Function to create a new user
  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await db
        .insert(Users)
        .values(userData)
        .returning({ id: Users.id, createdBy: Users.createdBy })
        .execute();
      setUsers((prevUsers) => [...prevUsers, newUser[0]]);
      return newUser[0];
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }, []);

  // Function to fetch all records for a specific user
  const fetchUserRecords = useCallback(async (userEmail) => {
    try {
      const result = await db
        .select()
        .from(Records)
        .where(eq(Records.createdBy, userEmail))
        .execute();
      setRecords(result);
    } catch (error) {
      console.error("Error fetching user records:", error);
    }
  }, []);

  // Function to create a new record
  const createRecord = useCallback(async (recordData) => {
    try {
      const newRecord = await db
        .insert(Records)
        .values(recordData)
        .returning({ id: Records.id })
        .execute();
      setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
      return newRecord[0];
    } catch (error) {
      console.error("Error creating record:", error);
      return null;
    }
  }, []);

  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentID, ...dataToUpdate } = recordData;
      const updatedRecords = await db
        .update(Records)
        .set(dataToUpdate)
        .where(eq(Records.id, documentID))
        .returning();
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  }, []);

  // Function to fetch all reminders
  const fetchReminders = useCallback(async () => {
    try {
      const result = await db
        .select()
        .from(Reminders)
        .execute();
      setReminders(result);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  }, []);  

  // Function to create a new reminder
  const createReminder = useCallback(async (reminderData) => {
    console.log("Reminder Data:", reminderData);
    try {
      const createdAt = new Date();
      const newReminder = await db
        .insert(Reminders)
        .values({
          name: reminderData.name,
          dosage: reminderData.dosage,
          time: reminderData.time,
          frequency: reminderData.frequency,
          createdBy: reminderData.createdBy,
          createdAt: createdAt,
        })
        .returning({ id: Reminders.id, createdAt: Reminders.createdAt })
        .execute();
      setReminders((prevReminders) => [...prevReminders, newReminder[0]]);
      return newReminder[0];
    } catch (error) {
      console.error("Error creating reminder:", error);
      return null;
    }
  }, []);  

  const deleteReminder = useCallback(async (id) => {
    try {
      await db.delete(Reminders).where(eq(Reminders.id, id)).execute();
      setReminders((prevReminders) =>
        prevReminders.filter((reminder) => reminder.id !== id)
      );
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  }, []);

  const markReminderAsDone = useCallback(async (id) => {
    try {
      await db
        .update(Reminders)
        .set({ isDone: true })
        .where(eq(Reminders.id, id))
        .execute();
  
      setReminders((prevReminders) =>
        prevReminders.map((reminder) =>
          reminder.id === id ? { ...reminder, isDone: true } : reminder
        )
      );
    } catch (error) {
      console.error("Error marking reminder as done:", error);
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        users,
        records,
        reminders,
        fetchUsers,
        fetchUserByEmail,
        createUser,
        fetchUserRecords,
        createRecord,
        createReminder,
        fetchReminders,
	deleteReminder,
	markReminderAsDone,
        currentUser,
        updateRecord,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);
