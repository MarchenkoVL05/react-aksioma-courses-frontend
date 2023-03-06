import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { passTest } from "../redux/slices/questionSlice";

function Test({ lesson }) {
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

  const testResult = useSelector((state) => state.question.result);

  return (
    <div className="test">
      <h4 className="test__title">Проверка знаний</h4>
      <form className="test__box" onSubmit={submitTestResult}>
        <ul className="test__questions">
          {lesson.questions &&
            lesson.questions.map((question) => {
              return (
                <li className="test__question" key={question._id}>
                  <div className="test__question-title">{question.QuestionTitle}</div>
                  {question.options.map((option) => {
                    return (
                      <label className="test__question-label b-contain" key={option._id}>
                        <input
                          className="test__question-input"
                          name={question._id}
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
        <button className="test__btn">Завершить</button>
      </form>
    </div>
  );
}

export default Test;