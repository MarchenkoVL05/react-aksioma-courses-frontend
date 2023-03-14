import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import LessonCard from "./LessonCard";
import LessonLoader from "../components/LessonLoader";

function LessonsList({ lessons, status, userInfo, searchError, searchStatus }) {
  const [isRemoveClicked, setIsRemoveClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const warningRef = useRef();

  const removeError = useSelector((state) => state.lesson.error);
  const message = useSelector((state) => state.lesson.message);

  const itemsPerPage = 8;
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const itemsToRender = lessons.slice(startIndex, startIndex + itemsPerPage);

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
        <>
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
                  : itemsToRender.map((lesson) => {
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
            <ReactPaginate
              pageCount={Math.ceil(lessons.length / itemsPerPage)} // количество страниц
              pageRangeDisplayed={3} // количество отображаемых страниц (слева и справа от текущей)
              marginPagesDisplayed={1} // количество отображаемых границ
              onPageChange={handlePageClick} // обработчик события выбора страницы
              containerClassName={"pagination"} // класс для контейнера
              activeClassName={"active"} // класс для активной страницы
              previousLabel={"\u2190"}
              nextLabel={"\u2192"}
            />
          </section>
        </>
      )}
    </>
  );
}

export default LessonsList;
