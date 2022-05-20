import { useContext } from "react";
import { AuthContext } from "../context/AuthProviderContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
