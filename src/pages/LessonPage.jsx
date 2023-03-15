import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";
import { fetchOneLesson } from "../redux/slices/lessonSlice.js";

import Header from "../components/Header";
import Video from "../components/Video";
import Test from "../components/Test";
import Loader from "../components/Loader";
import ErrorPage from "../pages/ErrorPage";

function LessonPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const accessState = location.state;
  const userInfo = useAuth();

  useEffect(() => {
    if (accessState !== null) {
      dispatch(fetchOneLesson(params.lessonId));
    } else {
      navigate("/");
    }
  }, []);

  const lesson = useSelector((state) => state.lesson.lesson);
  const lessonQuestions = useSelector((state) => state.lesson.questions);
  const lessonStatus = useSelector((state) => state.lesson.lessonStatus);
  const error = useSelector((state) => state.lesson.error);

  return (
    <>
      {lessonStatus === "loading" && !error && <Loader />}
      {lessonStatus !== "loading" && !error && Object.keys(lesson).length !== 0 && (
        <div>
          <Header userInfo={userInfo} />
          <div className="detail-page-wrapper">
            <div className="detail-page">
              <Video lesson={lesson} />
            </div>
            <Test lesson={lesson} questions={lessonQuestions} userInfo={userInfo} />
          </div>
        </div>
      )}
      {error && <ErrorPage />}
    </>
  );
}

export default LessonPage;
