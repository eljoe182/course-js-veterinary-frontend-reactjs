import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MessageComponent from "../../components/MessageComponent";
import { resetPassword, validateToken } from "../../services/vet.api";

const ResetPasswordPage = () => {
  const params = useParams();
  const { token } = params;

  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await validateToken(token);
      } catch (error) {
        setMessage({
          type: "error",
          text: error.message,
        });
        setShowForm(false);
      }
    };
    verifyToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([password, passwordConfirm].includes("")) {
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

    await resetPassword({ password, token })
      .then((response) => {
        const { message, data } = response;
        setMessage({
          type: "success",
          text: message,
        });
        setPasswordChanged(true);
        setShowForm(false);
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
        <h1 className="text-indigo-600 font-black text-5xl">
          Change your password and not miss access to <br />
          <span className="text-black">yours patients</span>
        </h1>
      </div>
      <div className="mt-14 md:mt-0 shadow-md bg-white px-5 py-10 rounded-xl">
        {message === "" ? null : <MessageComponent message={message} />}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                New Password
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
                Reset password
              </button>
            </div>
          </form>
        )}

        {passwordChanged && (
          <>
            <Link to="/" className="block text-center my-5 text-gray-500">
              Go to sign in
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default ResetPasswordPage;
