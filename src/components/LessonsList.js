import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LessonCard from "./LessonCard";
import LessonLoader from "../components/LessonLoader";

function LessonsList({ lessons, status, userInfo, searchError, searchStatus }) {
  const [isRemoveClicked, setIsRemoveClicked] = useState(false);

  const warningRef = useRef();

  const removeError = useSelector((state) => state.lesson.error);
  const message = useSelector((state) => state.lesson.message);

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
    <>
      {searchStatus == "loading" ? (
        <section className="lessons">
          <h1 className="lessons__not-found">Ищем уроки...</h1>
        </section>
      ) : searchError ? (
        <section className="lessons">
          <h1 className="lessons__not-found">Такой урок не найден</h1>
        </section>
      ) : (
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
                      <LessonCard
                        userInfo={userInfo}
                        lesson={lesson}
                        setIsRemoveClicked={setIsRemoveClicked}
                        key={lesson._id}
                      />
                    );
                  })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default LessonsList;
