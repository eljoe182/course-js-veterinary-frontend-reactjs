import React from "react";
import { usePatients } from "../hooks/usePatient";

const PatientComponent = ({ patient }) => {
  const { setPatientSelected, removePatient } = usePatients();
  const { name, owner, email, dateOut, symptoms } = patient;

  const dateFormat = (date) => {
    return new Intl.DateTimeFormat("en-ES", { dateStyle: "long" }).format(
      new Date(date)
    );
  };

  return (
    <>
      <div className="mx-5 my-5 bg-white shadow-md rounded-md p-5 hover:shadow-lg">
        <p className="font-bold uppercase text-indigo-700 my-1">
          Pet name:{" "}
          <span className="font-normal normal-case text-black">{name}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-1">
          Name owner:{" "}
          <span className="font-normal normal-case text-black">{owner}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-1">
          Email:{" "}
          <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-1">
          Date out:{" "}
          <span className="font-normal normal-case text-black">
            {dateFormat(dateOut)}
          </span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-1">
          Symptoms:{" "}
          <span className="font-normal normal-case text-black">{symptoms}</span>
        </p>
        <div className="flex justify-around mt-5 ">
          <button
            type="button"
            className="bg-indigo-600 py-2 px-10 rounded-md text-white hover:bg-indigo-800 transition-colors uppercase font-bold"
            onClick={() => setPatientSelected(patient)}
          >
            Edit
          </button>
          <button
            type="button"
            className="bg-red-600 py-2 px-10 rounded-md text-white hover:bg-red-800 transition-colors uppercase font-bold"
            onClick={() => removePatient(patient._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default PatientComponent;
