import { useState } from "react";
import { Link } from "react-router-dom";
import MessageComponent from "../../components/MessageComponent";
import { signUp } from "../../services/vet.api";

const SignUpPage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, passwordConfirm].includes("")) {
      setMessage({
        type: "error",
        text: "Please fill out all fields",
      });
      return;
    }

    if (password !== passwordConfirm) {
      setMessage({
        type: "error",
        text: "Passwords do not match",
      });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    setMessage("");

    await signUp({ name, email, password })
      .then((response) => {
        const { message, data } = response;
        setMessage({
          type: "success",
          text: message,
        });

        setTimeout(() => {
          setMessage("");
        }, 2000);
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
          Create a account and manage <br />
          <span className="text-black">yours patients</span>
        </h1>
      </div>
      <div className="mt-14 md:mt-0 shadow-md bg-white px-5 py-10 rounded-xl">
        {message === "" ? null : <MessageComponent message={message} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="name"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
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
              htmlFor="password"
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
            <label
              htmlFor="passwordConfirm"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password Confirm
            </label>
            <input
              type="password"
              placeholder="Repeat password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <button
              type="submit"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase text-bold hover:bg-indigo-800 md:w-auto"
            >
              Sign Up
            </button>
          </div>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">
            I have a account, sign in
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

export default SignUpPage;
