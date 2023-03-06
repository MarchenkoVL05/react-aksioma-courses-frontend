import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { fetchCategories } from "../redux/slices/categorySlice";
import axios from "../axios";

import upload from "../images/upload-img.svg";

function CreateLessonForm() {
  const [category, setCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useSelector((state) => state.category.categories);
  const categoriesStatus = useSelector((state) => state.category.status);

  const createLesson = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId);
    formData.append("video", data.video[0]);
    try {
      const response = await axios.post("/lesson", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate(`/lesson/${response.data._id}`);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const chooseCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(createLesson)} className="create-lesson-form">
      <label>
        Название урока:
        <input
          {...register("title", {
            required: "Название должно быть заполнено",
            minLength: { value: 10, message: "Название слишком короткое" },
          })}
          className="create-lesson-form__text-input"
          type="text"
          placeholder="Программирование в 1С - Вступление"
        />
        {errors?.title && <span className="error-message">{errors.title.message}</span>}
      </label>
      <label>
        Описание:
        <textarea
          {...register("content", {
            required: "Описание должно быть заполнено",
            minLength: { value: 10, message: "Описание слишком короткое" },
          })}
          className="create-lesson-form__text-textarea"
          placeholder="Первый урок бесплатного курса по программированию 1С 8.2 — это знакомство с платформой. Он охватывает такие темы, как константы, перечисления, документы, бизнес-процессы и многое другое. Дополнительные материалы к курсу доступны на странице курса, включая примеры из каждого урока. Другие ресурсы для изучения программирования на 1С включают статьи о программистах и руководства по подключению внешних процессов и работе с арифметическими и логическими операторами."
        ></textarea>
        {errors?.content && <span className="error-message">{errors.content.message}</span>}
      </label>
      <label>
        Отдел:
        <div className={errors?.categoryId ? "select-wrapper--appearance" : "select-wrapper--create-form"}>
          <select onChange={chooseCategory} {...register("categoryId", { required: "Выберите отдел" })}>
            {categoriesStatus == "loading" && <option>Загрузка...</option>}
            {categories &&
              categories.map((category) => {
                return (
                  <option value={category._id} key={category._id}>
                    {category.categoryName}
                  </option>
                );
              })}
          </select>
          {errors?.categoryId && <span className="error-message">{errors.categoryId.message}</span>}
        </div>
      </label>
      <div className="create-lesson-form__upload">
        Загрузить видео
        <img className="create-lesson-form__upload-img" src={upload} alt="" />
        <input
          {...register("video", {
            required: "Выберите видео",
          })}
          type="file"
        />
      </div>
      {errors?.video && <span className="error-message">{errors.video.message}</span>}
      <div className="create-lesson-form__btns-wrapper">
        <button onClick={() => navigate("/")} className="create-lesson-form__cancel">
          Отмена
        </button>
        <button
          className={
            Object.keys(errors).length > 0
              ? "create-lesson-form__submit auth-button-error"
              : "create-lesson-form__submit"
          }
          type="submit"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}

export default CreateLessonForm;
