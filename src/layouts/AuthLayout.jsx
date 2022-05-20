import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  if (auth?._id) return <Navigate to="/veterinary" />;

  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
