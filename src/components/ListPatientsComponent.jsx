import React from "react";
import { usePatients } from "../hooks/usePatient";
import PatientComponent from "./PatientComponent";

const ListPatientsComponent = () => {
  const { patients, loadingPatients } = usePatients();

  if (loadingPatients) return "Loading...";

  return (
    <>
      {patients.length === 0 ? (
        <>
          <h2 className="font-black text-3xl text-center">No have patients</h2>
          <p className="text-xl mt-5 text-center mb-10">
            Add your patients and{" "}
            <span className="text-indigo-600 font-bold">manage them</span>
          </p>
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">Patients</h2>
          <p className="text-xl mt-5 text-center mb-10">
            Manage your patients and{" "}
            <span className="text-indigo-600 font-bold">add new ones</span>
          </p>
          {patients.map((item) => (
            <PatientComponent key={item._id} patient={item} />
          ))}
        </>
      )}
    </>
  );
};

export default ListPatientsComponent;
