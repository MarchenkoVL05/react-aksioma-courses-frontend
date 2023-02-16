import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categorySlice";
import { registerUser } from "../redux/slices/userSlice";

function LoginForm() {
  const [category, setCategory] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
      .unwrap()
      .catch((error) => {
        console.log(error);
        alert("Не удалось загрузить список отделов");
      });
  }, [dispatch]);

  const categories = useSelector((state) => state.category.categories);
  const categoriesStatus = useSelector((state) => state.category.status);

  const registered = useSelector((state) => state.user.registered);
  const registerError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (registerError) {
      alert(registerError);
    }
  }, [registerError]);

  const onSubmit = (data) => {
    const { repeatPass, ...restFormData } = data;
    data = restFormData;
    dispatch(registerUser(data));
  };

  const chooseCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      {registered ? (
        <Navigate to="/" />
      ) : (
        <div>
          <h1 className="auth-form-title">Регистрация</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              Полное имя
              <input
                className={errors.fullName && "input-error"}
                type="text"
                placeholder="Петушкин Иван"
                {...register("fullName", {
                  required: "Ваше имя",
                  minLength: { value: 5, message: "Укажите полное имя" },
                  pattern: { value: /^[а-яА-Я]/, message: "Неверный формат имени" },
                })}
              />
              {errors?.fullName && <span className="error-message">{errors.fullName.message}</span>}
            </label>
            <label>
              Отдел
              <div className={`${errors?.workPosition ? "select-wrapper--appearance" : "select-wrapper"}`}>
                <select onChange={chooseCategory} {...register("workPosition", { required: "Выберите отдел" })}>
                  {categoriesStatus == "loading" && <option>Загрузка...</option>}
                  {categories &&
                    categories.map((category) => {
                      return <option key={category._id}>{category.categoryName}</option>;
                    })}
                </select>
                {errors?.workPosition && <span className="error-message">{errors.workPosition.message}</span>}
              </div>
            </label>
            <label>
              Пароль
              <input
                className={errors.password && "input-error"}
                type="password"
                {...register("password", {
                  required: "Пароль обязателен",
                  minLength: { value: 5, message: "Пароль должен содержать минимум 5 символов" },
                })}
              />
              {errors?.password && <span className="error-message">{errors.password.message}</span>}
            </label>
            <label>
              Повторите пароль
              <input
                className={errors.repeatPass && "input-error"}
                type="password"
                {...register("repeatPass", {
                  required: "Пароли должны совпадать",
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Пароли не совпадают";
                    }
                  },
                })}
              />
              {errors?.repeatPass && <span className="error-message">{errors.repeatPass.message}</span>}
            </label>
            <button className={Object.keys(errors).length > 0 ? "auth-button-error" : ""} type="submit">
              Зарегистрироваться
            </button>
            <p>
              Есть аккаунт?{" "}
              <Link to="/login" className="auth-link-register">
                Вход
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginForm;
