import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { filderByCategory } from "../redux/slices/lessonSlice";
import { fetchCategories } from "../redux/slices/categorySlice";
import { fetchLessons } from "../redux/slices/lessonSlice";

import logo from "../images/logo.svg";
import loop from "../images/loop.svg";
import profile from "../images/profile.svg";
import create from "../images/createLesson.svg";
import close from "../images/close.png";
import categoryArrow from "../images/categoryArrow.svg";
import addCategory from "../images/addCategory.png";

function Header({ userInfo }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useSelector((state) => state.category.categories);

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

  const openCategoriesMenu = () => {
    setCategoriesOpen(!categoriesOpen);
    setTimeout(() => {
      setCategoriesOpen(false);
    }, 10000);
  };

  const filterLessons = (categoryId) => {
    if (userInfo.role == "admin") {
      if (window.location.pathname == "/") {
        dispatch(filderByCategory(categoryId));
      } else {
        alert("Перейдите на страницу уроков");
      }
    } else {
      alert("Вы из другого отдела");
    }
  };

  const fetchAllLessons = () => {
    dispatch(fetchLessons());
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
          <div className="header__category-wrapper">
            <div className="header__category" onClick={openCategoriesMenu}>
              <img src={categoryArrow} alt="" />
              Отдел: <span>{userInfo.workPosition}</span>
            </div>
            <ul className={`header__category-list ${categoriesOpen ? "header__category-list--open" : ""}`}>
              {userInfo.role == "admin" && <li onClick={fetchAllLessons}>Все уроки</li>}
              {categories && userInfo.role == "admin"
                ? categories.map((category) => {
                    return (
                      <li key={category._id} onClick={() => filterLessons(category._id)}>
                        {category.categoryName}
                      </li>
                    );
                  })
                : categories
                    .filter((category) => category.categoryName != userInfo.workPosition)
                    .map((category) => {
                      return (
                        <li key={category._id} onClick={() => filterLessons(category._id)}>
                          {category.categoryName}
                        </li>
                      );
                    })}
            </ul>
          </div>
          {userInfo.role == "admin" && (
            <Link className="add-category-link" to="/category">
              <img src={addCategory} alt="" />
            </Link>
          )}
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
