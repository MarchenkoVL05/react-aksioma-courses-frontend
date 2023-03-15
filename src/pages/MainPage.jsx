import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";

import Header from "../components/Header";
import LessonsList from "../components/LessonsList";

import { fetchLessons } from "../redux/slices/lessonSlice";
import { searchedLesson } from "../redux/slices/lessonSlice";

import axios from "../axios";

function MainPage() {
  const [searchError, setSearchError] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("search")) {
      dispatch(fetchLessons());
    }
  }, []);

  const lessons = useSelector((state) => state.lesson.lessons);
  const status = useSelector((state) => state.lesson.status);

  useEffect(() => {
    if (userInfo.role == "admin" && searchParams.get("search")) {
      dispatch(searchedLesson([]));
      setSearchStatus("loading");
      const searchObj = {
        searchTitle: searchParams.get("search"),
      };
      axios
        .post("/lesson/search", searchObj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          dispatch(searchedLesson(response.data));
          setSearchError(false);
          setSearchStatus("resolved");
        })
        .catch((error) => {
          setSearchError(true);
          setSearchStatus("rejected");
        });
    }
  }, [searchParams]);

  return (
    <>
      <Header userInfo={userInfo} />
      <LessonsList
        lessons={lessons}
        userInfo={userInfo}
        status={status}
        searchError={searchError}
        searchStatus={searchStatus}
      />
    </>
  );
}

export default MainPage;
