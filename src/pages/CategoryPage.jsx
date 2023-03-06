import React from "react";
import { Navigate } from "react-router-dom";

import Header from "../components/Header";
import CreateCategoryForm from "../components/CreateCategoryForm";

import useAuth from "../hooks/useAuth.js";

function CategoryPage() {
  const userInfo = useAuth();
  return (
    <>
      {userInfo.role == "admin" ? (
        <div>
          <Header userInfo={userInfo} />
          <div className="create-form-wrapper">
            <CreateCategoryForm />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default CategoryPage;
