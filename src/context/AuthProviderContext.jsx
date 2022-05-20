import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, profile, updateProfile } from "../services/vet.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const clearAuth = () => {
    localStorage.removeItem("token");
    setAuth({});
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) clearAuth();
      await profile()
        .then((response) => {
          setAuth(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          clearAuth();
        });
    };
    verifyAuth();
  }, []);

  const updateProfileAuth = async ({ id, data }) => {
    await updateProfile({ id, data })
      .then(({ message, data }) => {
        setAuth(data);
        setMessage({
          type: "success",
          text: message,
        });
      })
      .catch((error) => {
        setMessage({
          type: "error",
          text: error.message,
        });
      });
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const changePasswordAuth = async (data) => {
    const { oldPassword, newPassword } = data;
    await changePassword({ oldPassword, newPassword })
      .then(({ message, data }) => {
        setAuth(data);
        setMessage({
          type: "success",
          text: message,
        });
        setPasswordChanged(true);
      })
      .catch((error) => {
        setMessage({
          type: "error",
          text: error.message,
        });
      });
    setTimeout(() => {
      setMessage("");
      setPasswordChanged(false);
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{
        messageAuth: message,
        passwordChanged,
        auth,
        setAuth,
        loading,
        clearAuth,
        updateProfileAuth,
        changePasswordAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
