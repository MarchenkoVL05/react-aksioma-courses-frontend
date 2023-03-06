import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/slices/categorySlice";

import CategoriesList from "./CategoriesList";

import axios from "../axios";

function CreateCategoryForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 4000);
  }, [error, success]);

  const handleCreateCategory = async (data) => {
    try {
      await axios.post("/category", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess("Отдел успешно создан");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className={`warning ${error && "warning--error"}`}>{error}</div>
        <div className={`warning ${success && "warning--success"}`}>{success}</div>
        <form onSubmit={handleSubmit(handleCreateCategory)} className="create-lesson-form">
          <label>
            Создание нового отдела
            <input
              {...register("categoryName", {
                required: "Название должно быть заполнено",
              })}
              type="text"
              className="create-lesson-form__text-input"
              placeholder="Название..."
            />
            {errors?.categoryName && <span className="error-message">{errors.categoryName.message}</span>}
          </label>
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
        <CategoriesList setError={setError} setSuccess={setSuccess} />
      </div>
    </>
  );
}

export default CreateCategoryForm;
