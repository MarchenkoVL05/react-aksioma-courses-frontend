import { useDispatch, useSelector } from "react-redux";

import { passTest } from "../redux/slices/lessonSlice";
import { removeQuestion } from "../redux/slices/lessonSlice";

import Loader from "./Loader";
import ResultChart from "./ResultChart";

import remove from "../images/removeLesson.svg";

function QuestionsList({ userInfo, questions, lesson, setCreate }) {
  const dispatch = useDispatch();

  const submitTestResult = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    const answers = [];
    for (let key in data) {
      answers.push(data[key]);
    }

    const userResult = {
      result: answers,
      lessonId: lesson._id,
    };

    dispatch(passTest(userResult));
  };

  const handleRemoveQuestion = (questionId) => {
    dispatch(removeQuestion(questionId));
  };

  const handleCreateQuestion = () => {
    setCreate(true);
  };

  const passingTestStatus = useSelector((state) => state.lesson.resultStatus);
  const testResult = useSelector((state) => state.lesson.result);

  return (
    <>
      <h4 className="test__title">Проверка знаний</h4>
      {userInfo.role == "admin" && (
        <button onClick={handleCreateQuestion} className="test__btn-create">
          Добавить вопрос
        </button>
      )}
      <form className="test__box" onSubmit={submitTestResult}>
        {passingTestStatus == "loading" ? (
          <Loader auto={true} />
        ) : Object.keys(testResult).length !== 0 ? (
          <ResultChart result={testResult} />
        ) : (
          <ul className="test__questions">
            {questions &&
              questions.map((question) => {
                return (
                  <li className="test__question" key={question._id}>
                    {userInfo.role == "admin" && (
                      <img
                        onClick={() => handleRemoveQuestion(question._id)}
                        className="test__question-remove"
                        src={remove}
                      />
                    )}
                    <div className="test__question-title">{question.QuestionTitle}</div>
                    {question.options.map((option) => {
                      return (
                        <label className="test__question-label b-contain" key={option._id}>
                          <input
                            className="test__question-input"
                            name={
                              question.inputType == "checkbox" ? question._id + String(Math.random()) : question._id
                            }
                            type={question.inputType}
                            value={option._id}
                          />
                          <div className="b-input"></div>
                          {option.optionTitle}
                        </label>
                      );
                    })}
                  </li>
                );
              })}
          </ul>
        )}
        {Object.keys(testResult).length == 0 && passingTestStatus !== "loading" && (
          <button
            className={`test__btn ${questions.length == 0 ? "test__btn--disable" : ""}`}
            disabled={questions.length == 0 ? true : false}
          >
            Завершить
          </button>
        )}
      </form>
    </>
  );
}

export default QuestionsList;
