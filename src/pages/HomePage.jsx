import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import axios from "../axios";

import WaitApprovePage from "./WaitApprovePage";

function HomePage() {
  const [userInfo, setUserInfo] = useState({});
  const [errorStatus, setErrorStatus] = useState("");

  useEffect(() => {
    axios
      .get("/user/getMe", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        setErrorStatus(true);
      });
  }, []);

  return (
    <>
      {userInfo && userInfo.approved && !errorStatus && <div>Welcome to HomePage, {userInfo.fullName}</div>}
      {userInfo && !userInfo.approved && <WaitApprovePage />}
      {errorStatus && <Navigate to="/login" />}
    </>
  );
}

export default HomePage;
