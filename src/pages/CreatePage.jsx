import React from "react";

import Header from "../components/Header";
import CreateLessonForm from "../components/CreateLessonForm";

import useAuth from "../hooks/useAuth.js";

function CreatePage() {
  const userInfo = useAuth();
  return (
    <>
      <Header userInfo={userInfo} />
      <div className="create-form-wrapper">
        <CreateLessonForm />
      </div>
    </>
  );
}

export default CreatePage;
