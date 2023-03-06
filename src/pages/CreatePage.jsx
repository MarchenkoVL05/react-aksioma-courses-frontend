import React from "react";
import { Navigate } from "react-router-dom";

import Header from "../components/Header";
import CreateLessonForm from "../components/CreateLessonForm";

import useAuth from "../hooks/useAuth.js";

function CreatePage() {
  const userInfo = useAuth();
  return (
    <>
      {userInfo.role == "admin" ? (
        <div>
          <Header userInfo={userInfo} />
          <div className="create-form-wrapper">
            <CreateLessonForm />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default CreatePage;
