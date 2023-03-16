import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { fetchResults, removeResult, removeProgress } from "../redux/slices/resultSlice";

import Loader from "./Loader";

import statisticsImg from "../images/statistics.png";

function ResultsTabel() {
  const [removeResultError, setRemoveResultError] = useState(false);
  const [removingResults, setRemovingResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5; // количество элементов на странице

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResults());
  }, []);

  const results = useSelector((state) => state.result.results);
  const resultsStatus = useSelector((state) => state.result.status);

  // Следующая страница
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const itemsToRender = results.slice(startIndex, startIndex + itemsPerPage);

  // Удалить результат из таблицы
  const handleRemoveResult = (id) => {
    const indexToRemove = results.findIndex((result) => result._id === id);

    const t = (results[indexToRemove].score / results[indexToRemove].questionCounter) * 100;

    // Если происходит удаление успешно сданного урока => проверь есть ли прогресс после него
    if (t >= 75) {
      const successedResults = [];
      results.slice(indexToRemove + 1).forEach((result) => {
        if ((result.score / result.questionCounter) * 100 >= 75) {
          successedResults.push(result);
        }
      });

      if (successedResults.length !== 0) {
        setRemoveResultError(
          "Ученик успешно прошёл этот урок и продвинулся дальше. Вы хотите удалить этот результат и весь последующий прогресс?"
        );
        setRemovingResults([...successedResults, results[indexToRemove]]);
        return;
      }
    }
    dispatch(removeResult(id));
  };

  // Подтвердить удаление
  function confirmRemoving() {
    dispatch(removeProgress(removingResults));
    setRemoveResultError(false);
    setRemovingResults(null);
  }

  // Отменить удаление
  function cancelRemoving() {
    setRemoveResultError(false);
    setRemovingResults(null);
  }

  // Форматируй результат ученика
  function formatNumber(num) {
    if (Number.isInteger(num)) {
      return num;
    } else {
      return num.toFixed(1);
    }
  }

  return (
    <>
      {resultsStatus == "loading" ? (
        <h2 className="user-results-title">
          <Loader auto={true} />
        </h2>
      ) : (
        <>
          <h2 className="user-results-title">
            <img src={statisticsImg} alt="" />
            Статистика учеников
          </h2>
          <div className={`warning ${removeResultError && "warning--error"}`}>
            {removeResultError}
            <div className="warning-btns-wrapper">
              <button onClick={confirmRemoving}>Да</button>
              <button onClick={cancelRemoving}>Отменить</button>
            </div>
          </div>
          <div className="user-results">
            <div className="user-results__head-wrapper">
              <div className="user-results__head user-results__head--brl">Название урока</div>
              <div className="user-results__head">Ученик</div>
              <div className="user-results__head">Правильно</div>
              <div className="user-results__head">Результат</div>
              <div className="user-results__head user-results__head--brr">Действие</div>
            </div>
            <div>
              {itemsToRender.map((result) => {
                return (
                  <div className="user-results__row" key={result._id}>
                    <div className="user-results__col">
                      <Link to={`/lesson/${result.lesson?._id}`} state={{ access: true }}>
                        {result.lesson?.title}
                      </Link>
                    </div>
                    <div className="user-results__col">{result.user?.fullName}</div>
                    <div className="user-results__col user-results__col--fb">
                      {result.score} <span>из</span> {result.questionCounter}
                    </div>
                    <div className="user-results__col user-results__col--fb">
                      {formatNumber((result.score / result.questionCounter) * 100)}%
                    </div>
                    <div
                      onClick={() => handleRemoveResult(result._id)}
                      className="user-results__col user-results__col--remove"
                    >
                      удалить
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <ReactPaginate
        pageCount={Math.ceil(results.length / itemsPerPage)} // количество страниц
        pageRangeDisplayed={3} // количество отображаемых страниц (слева и справа от текущей)
        marginPagesDisplayed={1} // количество отображаемых границ
        onPageChange={handlePageClick} // обработчик события выбора страницы
        containerClassName={"pagination"} // класс для контейнера
        activeClassName={"active"} // класс для активной страницы
        previousLabel={"\u2190"}
        nextLabel={"\u2192"}
      />
    </>
  );
}

export default ResultsTabel;
