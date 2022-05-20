import React, { useEffect, useState } from "react";
import MessageComponent from "../../components/MessageComponent";
import ProfileNavigationComponent from "../../components/ProfileNavigationComponent";
import { useAuth } from "../../hooks/useAuth";

export const ChangePasswordPage = () => {
  const { messageAuth, changePasswordAuth, clearAuth, passwordChanged } =
    useAuth();
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (passwordChanged) {
      setOldPassword("");
      setNewPassword("");
      clearAuth();
    }
  }, [passwordChanged]);

  useEffect(() => {
    setMessage(messageAuth);
  }, [messageAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([oldPassword, newPassword].some((value) => value === "")) {
      setMessage({
        type: "error",
        text: "All fields are required",
      });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long",
      });
      return;
    }

    changePasswordAuth({ oldPassword, newPassword });
  };

  return (
    <>
      <ProfileNavigationComponent />
      <h2 className="font-black text-3xl text-center mt-5">Change Password</h2>
      <p className="text-xl mt-5 text-center mb-10">
        Update you{" "}
        <span className="text-indigo-600 font-bold">password here!</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg py-10 px-5">
          {message !== "" && <MessageComponent message={message} />}
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="oldPassword"
                className="text-gray-700 uppercase font-bold pl-1"
              >
                Current Password
              </label>
              <input
                id="oldPassword"
                type="password"
                name="oldPassword"
                placeholder="Enter your current password"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="newPassword"
                className="text-gray-700 uppercase font-bold pl-1"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 w-full p-3 text-white uppercase font-bold rounded-md  transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
