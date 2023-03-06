import React from "react";

import Header from "../components/Header";
import CreateCategoryForm from "../components/CreateCategoryForm";

import useAuth from "../hooks/useAuth.js";

function CategoryPage() {
  const userInfo = useAuth();
  return (
    <>
      <Header userInfo={userInfo} />
      <div className="create-form-wrapper">
        <CreateCategoryForm />
      </div>
    </>
  );
}

export default CategoryPage;
