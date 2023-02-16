import React from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthPage({ register }) {
  let form = "";
  if (register) {
    form = <RegisterForm />;
  } else {
    form = <LoginForm />;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">{form}</div>
    </div>
  );
}

export default AuthPage;
