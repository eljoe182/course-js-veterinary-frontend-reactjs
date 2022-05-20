import { useContext } from "react";
import { PatientContext } from "../context/PatientProviderContext";

export const usePatients = () => {
  return useContext(PatientContext);
};
