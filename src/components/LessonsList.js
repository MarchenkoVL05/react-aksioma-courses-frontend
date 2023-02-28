import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LessonLoader from "../components/LessonLoader";

import { removeLesson } from "../redux/slices/lessonSlice";

import preview from "../images/video-preview-2.png";
import remove from "../images/removeLesson.svg";

function LessonsList({ lessons, status }) {
  const [isRemoveClicked, setIsRemoveClicked] = useState(false);

  const dispatch = useDispatch();
  const warningRef = useRef();

  const userInfo = useSelector((state) => state.user.userInfo);
  const removeError = useSelector((state) => state.lesson.error);
  const message = useSelector((state) => state.lesson.message);

  const handleRemoveLesson = (lessonId) => {
    let confirmRemoving = window.confirm("Вы уверены что хотите удалить этот урок?");
    if (confirmRemoving) {
      dispatch(removeLesson(lessonId));
      setIsRemoveClicked(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (removeError && isRemoveClicked) {
      warningRef.current.classList.add("warning--error");
      setTimeout(() => {
        warningRef.current.classList.remove("warning--error");
        setIsRemoveClicked(false);
      }, 3000);
    }
    if (message && isRemoveClicked) {
      warningRef.current.classList.add("warning--success");
      setTimeout(() => {
        warningRef.current.classList.remove("warning--success");
        setIsRemoveClicked(false);
      }, 3000);
    }
  }, [removeError, message, isRemoveClicked]);

  return (
    <section className="lessons">
      <div ref={warningRef} className="warning">
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
