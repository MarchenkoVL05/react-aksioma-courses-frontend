import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LessonLoader from "../components/LessonLoader";

import { removeLesson } from "../redux/slices/lessonSlice";

import preview from "../images/video-preview-2.png";
import remove from "../images/removeLesson.svg";

function LessonsList({ lessons, status }) {
  const dispatch = useDispatch();
  const warningRef = useRef();

  const userInfo = useSelector((state) => state.user.userInfo);
  const removeError = useSelector((state) => state.lesson.error);
  const message = useSelector((state) => state.lesson.message);

  const handleRemoveLesson = (lessonId) => {
    let confirmRemoving = window.confirm("Вы уверены что хотите удалить этот урок?");
    if (confirmRemoving) {
      dispatch(removeLesson(lessonId));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (removeError) {
      warningRef.current.classList.add("warning--error");
      setTimeout(() => {
        warningRef.current.classList.remove("warning--error");
      }, 3000);
    }
  });

  useEffect(() => {
    if (message) {
      warningRef.current.classList.add("warning--success");
      setTimeout(() => {
        warningRef.current.classList.remove("warning--success");
      }, 3000);
    }
  });

  return (
    <section className="lessons">
      <div ref={warningRef} className={removeError ? "warning warning--error" : "warning"}>
        {removeError || message}
      </div>
      <div className="lessons__wrapper">
        <div className="lessons__inner">
          {status === "loading"
            ? [...Array(8)].map((_, index) => {
                return <LessonLoader key={index} />;
              })
            : lessons.map((lesson) => {
                return (
                  <div className="lessons__item" key={lesson._id}>
                    {userInfo.role == "admin" && (
                      <button
                        onClick={() => handleRemoveLesson(lesson._id)}
                        className="lessons__item-remove"
                        type="button"
                      >
                        <img src={remove} />
                      </button>
                    )}
                    <Link to={lesson._id} state={status}>
                      <img className="lessons__item-preview" src={preview} alt="" />
                      <div className="lessons__item-title">{lesson.title}</div>
                      <div className="lessons__item-content">
                        {lesson.content.length > 70 ? lesson.content.slice(0, 70) + "..." : lesson.content}
                      </div>
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}

export default LessonsList;
