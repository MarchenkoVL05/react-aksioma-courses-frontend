import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import logo from "../images/logo.svg";
import loop from "../images/loop.svg";
import profile from "../images/profile.svg";
import create from "../images/createLesson.svg";
import close from "../images/close.png";

function Header({ userInfo }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleModal = () => {
    setOpen(!open);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setOpen(false);
    window.location.href = "/";
  };

  const handleSearch = (data) => {
    if (data.searchTitle === "") {
      window.location.href = "/";
    } else {
      navigate(`/?search=${data.searchTitle}`);
    }
  };

  const clearSearch = () => {
    window.location.href = "/";
  };

  return (
    <>
      <header className="header">
        <div className="header__left">
          {searchParams.get("search") ? (
            <img className="common-logo" onClick={() => (window.location.href = "/")} src={logo} alt="" />
          ) : (
            <Link className="header__link" to="/">
              <img src={logo} alt="" />
            </Link>
          )}
          <form onSubmit={handleSubmit(handleSearch)} className="search">
            <button type="submit">
              <img src={loop} alt="" />
            </button>
            <input {...register("searchTitle")} className="search__input" placeholder="Поиск..." type="text" />
            {searchParams.get("search") && (
              <img onClick={clearSearch} className="clean-search" src={close} alt="Очистить поиск" />
            )}
          </form>
          <div className="header__category">
            Отдел: <span>{userInfo.workPosition}</span>
          </div>
        </div>
        <div className="header__btns-wrapper">
          {userInfo.role == "admin" && (
            <Link to="/create">
              <div className="create-lesson-btn">
                <img src={create} alt="" /> Создать урок
              </div>
            </Link>
          )}
          <button onClick={toggleModal} className="header__name" type="button">
            {userInfo.fullName} <img src={profile} alt="" />
          </button>
        </div>
      </header>
      {open && <div onClick={toggleModal} className="overlay"></div>}
      {open && (
        <div className="userInfo">
          <img src={logo} alt="" />
          <div className="userInfo-name">Полное имя: {userInfo.fullName}</div>
          <div className="userInfo-workPosition">Отдел: {userInfo.workPosition}</div>
          <div className="userInfo-role">
            Роль пользователя: {userInfo.role == "admin" ? "Администратор" : "Ученик"}
          </div>
          <div className="userInfo-approved">
            {userInfo.approved == true ? "Допусчен до курсов" : "Не допусчен до курсов"}
          </div>
          <button onClick={logOut} className="userInfo-logOut">
            Выйти
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
