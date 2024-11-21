import React, { useEffect } from "react";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";

const Profile = () => {
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
        <div className="text-lg text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center">
          {/* Avatar Section */}
          <div className="mb-6 h-24 w-24 flex items-center justify-center rounded-full bg-green-500 shadow-lg">
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
        <div className="mt-8 space-y-6">
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
        <div className="mt-8 flex justify-between">
          <button className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
