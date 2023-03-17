import { useRef, useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";

import LessonCard from "./LessonCard";
import LessonBlocked from "./LessonBlocked";
import LessonLoader from "../components/LessonLoader";

function LessonsList({ lessons, status, userInfo, searchError, searchStatus }) {
  const [isRemoveClicked, setIsRemoveClicked] = useState(false);
  const [courses, setCourses] = useState(null);

  const warningRef = useRef();

  const removeError = useSelector((state) => state.lesson.error);
  const message = useSelector((state) => state.lesson.message);

  useEffect(() => {
    const lessonsWithCounter = lessons.map((obj, index) => {
      return { ...obj, counter: index };
    });

    const groupByCourse = lessonsWithCounter.reduce((acc, obj) => {
      const key = obj.course;

      if (!acc[key]) {
        acc[key] = { lastLesson: null, lessons: [] };
      }

      const group = acc[key];

      if (group.lastLesson !== null) {
        const nextIndex = group.lastLesson.counter + 1;
        if (nextIndex !== obj.counter) {
          // There's a gap in the lesson indexes, so we'll add a placeholder
          const numMissing = obj.counter - nextIndex;
          group.lessons = group.lessons.concat(Array(numMissing).fill(null));
        }
      }

      group.lessons.push(obj);
      group.lastLesson = obj;

      return acc;
    }, {});

    console.log(groupByCourse);

    setCourses(groupByCourse);
  }, [lessons]);

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
      ) : status === "loading" ? (
        <section className="lessons">
          <div className="lessons__wrapper">
            <div className="lessons__inner">
              {[...Array(8)].map((_, index) => {
                return <LessonLoader key={index} />;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="lessons">
          {courses &&
            Object.keys(courses).map((course, courseIndex) => {
              return (
                <Fragment key={courseIndex}>
                  <div className="course-title-wrapper">
                    <h2 className="course-title">{course ? course : "Уроки вне курсов"}</h2>
                  </div>
                  <div ref={warningRef} className="warning">
                    {removeError || message}
                  </div>
                  <div className="lessons__wrapper">
                    <div className="lessons__inner">
                      {courses[course].lessons.map((lesson, lessonIndex) => {
                        if (lesson && lesson.counter < userInfo.lessonsAccessed) {
                          return (
                            <LessonCard
                              userInfo={userInfo}
                              lesson={lesson}
                              setIsRemoveClicked={setIsRemoveClicked}
                              key={lesson._id}
                            />
                          );
                        } else if (userInfo.role == "admin") {
                          return (
                            <LessonCard
                              userInfo={userInfo}
                              lesson={lesson}
                              setIsRemoveClicked={setIsRemoveClicked}
                              key={lesson._id}
                            />
                          );
                        } else {
                          return <LessonBlocked key={lessonIndex} />;
                        }
                      })}
                    </div>
                  </div>
                </Fragment>
              );
            })}
        </section>
      )}
    </>
  );
}

export default LessonsList;
