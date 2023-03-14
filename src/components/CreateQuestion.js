import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { addQuestion } from "../redux/slices/lessonSlice";

function CreateQuestion({ setCreate, lesson }) {
  const [question, setQuestion] = useState("");
  const [inputType, setInputType] = useState("radio");
  const [options, setOptions] = useState([
    { optionTitle: "", right: false },
    { optionTitle: "", right: false },
  ]);

  const [createQuestionError, setCreateQuestionError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const addOption = () => {
    setOptions([...options, { optionTitle: "", right: false }]);
  };

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...options];
    newOptions[index][key] = value;
    setOptions(newOptions);
  };

  const dispatch = useDispatch();

  const handleCreateQuestion = (data) => {
    const isOptionTitleEmpty = options.some((option) => option.optionTitle === "");
    const isOptionRight = options.some((option) => option.right === true);

    if (isOptionTitleEmpty || !isOptionRight) {
      setCreateQuestionError("Придумайте варианты ответов, выберите хотя бы один верный");
      return;
    }

    const newQuestion = {
      lesson: lesson._id,
      questionTitle: data.questionTitle,
      inputType: inputType,
      options: options,
    };

    dispatch(addQuestion(newQuestion));

    setCreate(false);
  };

  useEffect(() => {
    if (createQuestionError != null) {
      setTimeout(() => {
        setCreateQuestionError(null);
      }, 3000);
    }
  }, [createQuestionError]);

  return (
    <>
      {createQuestionError && (
        <div className={`warning ${createQuestionError && "warning--error"}`}>{createQuestionError}</div>
      )}
      <form className="test__box create-q" onSubmit={handleSubmit(handleCreateQuestion)}>
        <label>
          Введите вопрос &#9998;
          <input
            {...register("questionTitle", {
              required: "Название урока должно быть заполнено",
              minLength: { value: 5, message: "Название слишком короткое" },
            })}
            placeholder="В чём смысл жизни?"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {errors?.questionTitle && <span className="error-message">{errors.questionTitle.message}</span>}
        </label>
        <label>
          Тип вопроса &#8595;
          <select {...register("inputType")} value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option value="radio">Выбрать один ответ</option>
            <option value="checkbox">Выбрать несколько ответов</option>
          </select>
        </label>
        <label>
          Варианты ответов:
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option.optionTitle}
                minLength="5"
                onChange={(e) => handleOptionChange(index, "optionTitle", e.target.value)}
              />
              <label className="b-contain">
                Правильный ответ
                <input
                  className="b-contain"
                  type="checkbox"
                  checked={option.right}
                  onChange={(e) => handleOptionChange(index, "right", e.target.checked)}
                />
                <div className="b-input"></div>
              </label>
            </div>
          ))}
          <div className="create-q__btns-wrapper">
            <button type="button" onClick={() => setCreate(false)}>
              Вернуться к вопросам
            </button>
            <button type="button" onClick={addOption}>
              Добавить вариант ответа
            </button>
            <button type="submit">Создать вопрос</button>
          </div>
        </label>
      </form>
    </>
  );
}

export default CreateQuestion;
