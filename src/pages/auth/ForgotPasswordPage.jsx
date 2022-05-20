import React, { useState } from "react";
import { Link } from "react-router-dom";
import MessageComponent from "../../components/MessageComponent";
import { forgotPassword } from "../../services/vet.api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setMessage({
        type: "error",
        text: "Please enter your email address",
      });
      return;
    }

    await forgotPassword(email)
      .then((response) => {
        setMessage({
          type: "success",
          text: response.message,
        });
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
          Recover your account and not miss <br />
          <span className="text-black">your patients</span>
        </h1>
      </div>
      <div className="mt-14 md:mt-0 shadow-md bg-white px-5 py-10 rounded-xl">
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
            <button
              type="submit"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase text-bold hover:bg-indigo-800 md:w-auto"
            >
              Send recovery link
            </button>
          </div>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            I have a account, sign in
          </Link>
          <Link to="/signup" className="block text-center my-5 text-gray-500">
            Don't have a account?, sign up
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
