import React from "react";
import { Navigate } from "react-router-dom";

import Header from "../components/Header";
import UsersPanel from "../components/UsersPanel";

import useAuth from "../hooks/useAuth.js";

function UserPage() {
  const userInfo = useAuth();
  return (
    <>
      {userInfo.role == "admin" ? (
        <div>
          <Header userInfo={userInfo} />
          <div className="create-form-wrapper">
            <UsersPanel />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default UserPage;
