import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { loginUser } from "../redux/slices/userSlice";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const logged = useSelector((state) => state.user.logged);
  const error = useSelector((state) => state.user.error);

  return (
    <>
      {logged ? (
        <Navigate to="/" />
      ) : (
        <div>
          {<div className={`errorBox ${error ? "active" : ""}`}>{error}</div>}
          <h1 className="auth-form-title">Вход</h1>
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
            <button className={Object.keys(errors).length > 0 ? "auth-button-error" : ""} type="submit">
              Войти
            </button>
            <p>
              Нет аккаунта?{" "}
              <Link to="/register" className="auth-link-register">
                Создайте его сейчас
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginForm;
