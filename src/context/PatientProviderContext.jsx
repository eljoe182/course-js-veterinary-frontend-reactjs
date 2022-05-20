import { useState, useEffect, createContext } from "react";
import {
  getPatients,
  storePatient,
  updatePatient,
  deletePatient,
} from "../services/patient.api";

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [patientSelected, setPatientSelected] = useState({});

  const savePatient = async (patient) => {
    if (patient.id === "") {
      await storePatient(patient)
        .then(({ message, data }) => {
          setMessage({
            type: "success",
            text: message,
          });
          setPatients([data, ...patients]);
        })
        .catch((error) => {
          setMessage({
            type: "error",
            text: error.message,
          });
        });
    } else {
      await updatePatient({
        id: patient.id,
        data: patient,
      })
        .then(({ message, data }) => {
          setMessage({
            type: "success",
            text: message,
          });
          const newPatients = patients.map((item) => {
            if (item._id === data._id) {
              return data;
            }
            return item;
          });
          setPatients(newPatients);
        })
        .catch((error) => {
          setMessage({
            type: "error",
            text: error.message,
          });
        });
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const removePatient = async (id) => {
    const remove = confirm("Are you sure?");
    if (remove) {
      await deletePatient(id)
        .then(({ message, data }) => {
          setMessage({
            type: "info",
            text: message,
          });
          const newPatients = patients.filter((item) => item._id !== id);
          setPatients(newPatients);
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
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getPatients()
        .then(({ data }) => {
          setPatients(data);
          setLoadingPatients(false);
        })
        .catch((error) => {
          setMessage({
            type: "error",
            text: error.message,
          });
          setLoadingPatients(false);
        });
    };
    getData();
  }, []);

  return (
    <PatientContext.Provider
      value={{
        loadingPatients,
        patients,
        message,
        patientSelected,
        setPatientSelected,
        savePatient,
        removePatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
