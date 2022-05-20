import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HeaderComponent = () => {
  const { clearAuth } = useAuth();
  return (
    <header className="py-5 bg-indigo-600 shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Manage{" "}
          <span className="text-white font-black">veterinary patients</span>
        </h1>
        <nav className="flex flex-col lg:flex-row gap-4 mt-5 lg:mt-0 items-center">
          <Link
            to="/veterinary"
            className="text-white text-sm uppercase font-bold"
          >
            Patients
          </Link>
          <Link
            to="/veterinary/profile"
            className="text-white text-sm uppercase font-bold"
          >
            profile
          </Link>
          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={clearAuth}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
