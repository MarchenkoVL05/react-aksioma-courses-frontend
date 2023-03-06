import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchCategories } from "../redux/slices/categorySlice";

import axios from "../axios";

import removeCategoryImg from "../images/removeCategory.png";

function CreateCategoryForm() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

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
      setError(false);
    }, 4000);
  }, [error]);

  const categories = useSelector((state) => state.category.categories);

  const handleCreateCategory = async (data) => {
    try {
      await axios.post("/category", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess(true);
      setSuccessMessage("Отдел успешно создан");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleRemoveCategory = async (id) => {
    try {
      const confirmRemoving = window.confirm("Вы хотите удалить отдел и все уроки в нём?");
      if (confirmRemoving) {
        const removingCategoryObj = {
          id: id,
        };

        await axios.delete("/category", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: removingCategoryObj,
        });
        setSuccess(true);
        setSuccessMessage("Отдел, уроки и вопросы к ним удалены");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        return;
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className={`warning ${error && "warning--error"}`}>{errorMessage}</div>
        <div className={`warning ${success && "warning--success"}`}>{successMessage}</div>
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
        <div className="categories-list">
          <ul>
            {console.log(categories)}
            {categories.map((category) => {
              return (
                <li key={category._id}>
                  {category.categoryName}{" "}
                  <img onClick={() => handleRemoveCategory(category._id)} src={removeCategoryImg} alt="" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CreateCategoryForm;
