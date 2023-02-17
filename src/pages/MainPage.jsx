import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import LessonsList from "../components/LessonsList";

import { fetchLessons } from "../redux/slices/lessonSlice";

function MainPage() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchLessons());
  }, []);

  const lessons = useSelector((state) => state.lesson.lessons);
  const status = useSelector((state) => state.lesson.status);

  return (
    <>
      <Header userInfo={userInfo} />
      <LessonsList lessons={lessons} status={status} />
    </>
  );
}

export default MainPage;
