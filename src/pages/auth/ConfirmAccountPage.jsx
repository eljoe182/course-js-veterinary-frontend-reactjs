import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { confirm } from "../../services/vet.api";
import MessageComponent from "../../components/MessageComponent";

const ConfirmAccountPage = () => {
  const params = useParams();
  const { token } = params;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { message } = await confirm(token);
        setConfirmed(true);
        setMessage({
          type: "success",
          text: message,
        });
      } catch (error) {
        setMessage({
          type: "error",
          text: error.message,
        });
      }
      setLoading(false);
    };
    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirm your account and start manage <br />
          <span className="text-black">yours patients</span>
        </h1>
      </div>
      <div className="mt-14 md:mt-0 shadow-md bg-white px-5 py-10 rounded-xl">
        {message === "" ? null : <MessageComponent message={message} />}
        {confirmed && (
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

export default ConfirmAccountPage;
