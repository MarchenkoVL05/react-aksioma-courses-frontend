import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authUser } from "../redux/slices/userSlice";

import WaitApprovePage from "./WaitApprovePage";
import Loader from "../components/Loader";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, []);

  const userInfo = useSelector((state) => state.user.userInfo);
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);

  if (status === "loading" || !status) {
    return <Loader />;
  } else {
    return (
      <>
        {status == "loading" && <Loader />}
        {error && Object.keys(userInfo).length == 0 && <Navigate to="/login" />}
        {Object.keys(userInfo).length !== 0 && !userInfo.approved && <WaitApprovePage />}
        {userInfo && userInfo.approved && !error && <h1>Welcome to Home Page!, {userInfo.fullName}</h1>}
      </>
    );
  }
}

export default HomePage;
