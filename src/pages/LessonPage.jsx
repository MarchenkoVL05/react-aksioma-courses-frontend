import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";
import { fetchOneLesson } from "../redux/slices/lessonSlice.js";

import Header from "../components/Header";
import Video from "../components/Video.jsx";
import Test from "../components/Test.jsx";

function LessonPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const userInfo = useAuth();

  useEffect(() => {
    dispatch(fetchOneLesson(params.lessonId));
  }, []);

  const lesson = useSelector((state) => state.lesson.lesson);

  return (
    <>
      <Header userInfo={userInfo} />
      <div className="detail-page-wrapper">
        <div className="detail-page">
          <Video lesson={lesson} />
        </div>
        <div className="test">
          <Test lesson={lesson} />
        </div>
      </div>
    </>
  );
}

export default LessonPage;
