import React, { useEffect, useState } from "react";
import MessageComponent from "../../components/MessageComponent";
import ProfileNavigationComponent from "../../components/ProfileNavigationComponent";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage = () => {
  const { auth, updateProfileAuth, messageAuth } = useAuth();
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  useEffect(() => {
    setMessage(messageAuth);
  }, [messageAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email } = profile;

    if ([name, email].some((field) => field === "")) {
      setMessage({
        type: "error",
        text: "Please fill name and email fields",
      });
      return;
    }

    setMessage("");
    updateProfileAuth({ id: auth._id, data: profile });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <>
      <ProfileNavigationComponent />
      <h2 className="font-black text-3xl text-center mt-5">Edit Profile</h2>
      <p className="text-xl mt-5 text-center mb-10">
        Modify you{" "}
        <span className="text-indigo-600 font-bold">information here!</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg py-10 px-5">
          {message !== "" && <MessageComponent message={message} />}
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="text-gray-700 uppercase font-bold pl-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="What is your name?"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={profile?.name ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="text-gray-700 uppercase font-bold pl-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="What is your email?"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={profile?.email ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="text-gray-700 uppercase font-bold pl-1"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="What is your phone?"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={profile?.phone ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 w-full p-3 text-white uppercase font-bold rounded-md  transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
