import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MessageComponent from "../../components/MessageComponent";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../services/vet.api";

const SignInPage = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setMessage({
        type: "error",
        text: "Please fill out all fields",
      });
      return;
    }

    setMessage("");

    await login({ email, password })
      .then((response) => {
        const { message, data } = response;
        localStorage.setItem("token", data.token);
        setMessage({
          type: "success",
          text: message,
        });

        navigation("/veterinary");
      })
      .catch((error) => {
        setMessage({
          type: "error",
          text: error.message,
        });
      });
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Start your session and manage <br />
          <span className="text-black">your patients</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-md bg-white px-5 py-10 rounded-xl">
        {message === "" ? null : <MessageComponent message={message} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <button
              type="submit"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase text-bold hover:bg-indigo-800 md:w-auto"
            >
              Sign In
            </button>
          </div>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/signup" className="block text-center my-5 text-gray-500">
            Don't have a account?, sign up
          </Link>
          <Link
            to="/forgot-password"
            className="block text-center my-5 text-gray-500"
          >
            Forgot password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default SignInPage;
