import { useState, useEffect } from "react";
import MessageComponent from "./MessageComponent";
import { usePatients } from "../hooks/usePatient";

const dateFormat = (date) => {
  const newDate = new Date(date ?? Date.now());
  return newDate.toLocaleDateString("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const FormComponent = () => {
  const {
    savePatient,
    patientSelected,
    setPatientSelected,
    message: messageProvider,
  } = usePatients();
  const [idPatient, setIdPatient] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [dateOut, setDateOut] = useState(dateFormat(Date.now()));
  const [symptoms, setSymptoms] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(messageProvider);
  }, [messageProvider]);

  useEffect(() => {
    setIdPatient(patientSelected?._id ?? "");
    setName(patientSelected?.name ?? "");
    setOwner(patientSelected?.owner ?? "");
    setEmail(patientSelected?.email ?? "");
    setDateOut(dateFormat(patientSelected?.dateOut));
    setSymptoms(patientSelected?.symptoms ?? "");
  }, [patientSelected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, owner, email, dateOut, symptoms].some((field) => field === "")) {
      setMessage({
        type: "error",
        text: "Please fill all fields",
      });
      return;
    }

    setMessage("");

    savePatient({
      id: idPatient,
      name,
      owner,
      email,
      dateOut,
      symptoms,
    });

    setName("");
    setOwner("");
    setEmail("");
    setDateOut("");
    setSymptoms("");
    setIdPatient("");
    setPatientSelected({});
  };

  return (
    <>
      <h2 className="font-black text-3xl text-center">Patient Manager</h2>
      <p className="text-xl mt-5 text-center mb-10">
        Add your patients and{" "}
        <span className="text-indigo-600 font-bold">manage them</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="px-5 bg-white py-10 mx-5 rounded-xl shadow-md mb-10 lg:mb-0"
      >
        <div className="mb-5">
          <label
            htmlFor="pet"
            className="text-gray-700 uppercase font-bold pl-1"
          >
            Pet name
          </label>
          <input
            type="text"
            id="pet"
            placeholder="Name of the pet"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="owner"
            className="text-gray-700 uppercase font-bold pl-1"
          >
            Name owner
          </label>
          <input
            type="text"
            id="owner"
            placeholder="Name of the owner"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="text-gray-700 uppercase font-bold pl-1"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email of the owner, not of the pet"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="dateOut"
            className="text-gray-700 uppercase font-bold pl-1"
          >
            Date out
          </label>
          <input
            type="date"
            id="dateOut"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={dateOut}
            onChange={(e) => setDateOut(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-gray-700 uppercase font-bold pl-1"
          >
            Symptoms
          </label>
          <textarea
            id="symptoms"
            rows="5"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="what happened with the pet?"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>
        {message !== "" && <MessageComponent message={message} />}
        <div className="mb-5">
          <button
            type="submit"
            className={`${
              idPatient === ""
                ? "bg-indigo-600 hover:bg-indigo-800"
                : "bg-green-600 hover:bg-green-800"
            } w-full p-3 text-white uppercase font-bold rounded-md  transition-colors`}
          >
            {idPatient === "" ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormComponent;
