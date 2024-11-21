import React, { useEffect } from "react";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";

const Profile = ({darkMode}) => {
  const { currentUser, fetchUserByEmail } = useStateContext();
  const { user } = usePrivy();

  useEffect(() => {
    if (!currentUser) {
      fetchUserByEmail(user?.email?.address);
    }
  }, [currentUser, fetchUserByEmail]);

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-500 animate-pulse">Log in to view your profile</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 p-6  ${darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-green-50"}`}>
      {/* Profile Card */}
      <div className={`max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 ${darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-green-50"} flex flex-col justify-center items-center min-h-screen`}>
  <div className="flex flex-col items-center">
    {/* Avatar Section */}
    <div className="mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-green-500 shadow-lg">
      <span className="text-4xl text-white">😊</span>
    </div>
    <h1 className="text-2xl font-bold text-green-600 mb-2">
      User Profile
    </h1>
    <p className="text-gray-500">
      View and manage your personal details.
    </p>
  </div>

  {/* User Details */}
  <div className="mt-6 space-y-4 w-full">
    <div className="flex flex-col">
      <label className="text-sm text-gray-500 mb-1">Email:</label>
      <p className="text-lg font-semibold text-gray-700">
        {currentUser.createdBy}
      </p>
    </div>
    <div className="flex flex-col">
      <label className="text-sm text-gray-500 mb-1">Username:</label>
      <p className="text-lg font-semibold text-gray-700">
        {currentUser.username}
      </p>
    </div>
    <div className="flex flex-col">
      <label className="text-sm text-gray-500 mb-1">Age:</label>
      <p className="text-lg font-semibold text-gray-700">
        {currentUser.age}
      </p>
    </div>
    <div className="flex flex-col">
      <label className="text-sm text-gray-500 mb-1">Location:</label>
      <p className="text-lg font-semibold text-gray-700">
        {currentUser.location}
      </p>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="mt-6 w-full flex justify-between space-x-4">
    <button className="bg-green-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-green-600 transition w-1/2 text-sm">
      Edit Profile
    </button>
    <button className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-600 transition w-1/2 text-sm">
      Delete Account
    </button>
  </div>
</div>

    </div>
  );
};

export default Profile;
