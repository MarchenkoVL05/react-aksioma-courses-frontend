import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../redux/slices/userSlice";

export default function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, []);

  const userInfo = useSelector((state) => state.user.userInfo);

  return userInfo;
}
