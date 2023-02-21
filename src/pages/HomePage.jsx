import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useAuth from "../hooks/useAuth.js";

import WaitApprovePage from "./WaitApprovePage";
import MainPage from "./MainPage";
import Loader from "../components/Loader";

function HomePage() {
  const userInfo = useAuth();
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
        {userInfo && userInfo.approved && !error && <MainPage />}
      </>
    );
  }
}

export default HomePage;
