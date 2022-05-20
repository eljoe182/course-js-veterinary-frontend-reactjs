import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const AdminLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <HeaderComponent />
      <main className="container mx-auto mt-10">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
};

export default AdminLayout;
