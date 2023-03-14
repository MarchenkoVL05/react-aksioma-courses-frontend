import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchResults } from "../redux/slices/resultSlice";
import { removeResult } from "../redux/slices/resultSlice";

import Loader from "./Loader";

import statisticsImg from "../images/statistics.png";

function ResultsTabel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResults());
  }, []);

  const results = useSelector((state) => state.result.results);
  const resultsStatus = useSelector((state) => state.result.status);

  const handleRemoveResult = (id) => {
    dispatch(removeResult(id));
  };

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
          <div className="user-results">
            <div className="user-results__head-wrapper">
              <div className="user-results__head user-results__head--brl">Название урока</div>
              <div className="user-results__head">Ученик</div>
              <div className="user-results__head">Правильно</div>
              <div className="user-results__head">Результат</div>
              <div className="user-results__head user-results__head--brr">Действие</div>
            </div>
            <div>
              {results.map((result) => {
                return (
                  <div className="user-results__row">
                    <div className="user-results__col">
                      <Link to={`/lesson/${result.lesson?._id}`}>{result.lesson?.title}</Link>
                    </div>
                    <div className="user-results__col">{result.user?.fullName}</div>
                    <div className="user-results__col user-results__col--fb">
                      {result.score} <span>из</span> {result.questionCounter}
                    </div>
                    <div className="user-results__col user-results__col--fb">
                      {formatNumber(result.score / result.questionCounter) * 100}%
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
    </>
  );
}

export default ResultsTabel;
