import React from "react";
import { Link } from "react-router-dom";

const ProfileNavigationComponent = () => {
  return (
    <nav className="flex gap-4">
      <Link
        to="/veterinary/profile"
        className="font-bold uppercase text-gray-500"
      >
        Profile
      </Link>
      <Link
        to="/veterinary/change-password"
        className="font-bold uppercase text-gray-500"
      >
        Change Password
      </Link>
    </nav>
  );
};

export default ProfileNavigationComponent;
