import React, { useState } from "react";
import FormComponent from "../../components/FormComponent";
import ListPatientsComponent from "../../components/ListPatientsComponent";
import { PatientProvider } from "../../context/PatientProviderContext";

const PatientPage = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <PatientProvider>
      <div className="flex flex-col md:flex-row">
        <button
          className="bg-indigo-600 text-white py-3 mx-10 mb-10 rounded-md hover:bg-indigo-800 transition-colors uppercase md:hidden"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide form" : "Show form"}
        </button>
        <div
          className={`${
            showForm ? "block" : "hidden"
          } md:block md:w-1/2 lg:w-2/5`}
        >
          <FormComponent />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <ListPatientsComponent />
        </div>
      </div>
    </PatientProvider>
  );
};

export default PatientPage;
