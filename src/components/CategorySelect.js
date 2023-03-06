import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchCategories } from "../redux/slices/categorySlice";
import { fetchLessons } from "../redux/slices/lessonSlice";
import { filderByCategory } from "../redux/slices/lessonSlice";

import categoryArrow from "../images/categoryArrow.svg";

function CategorySelect({ userInfo }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useSelector((state) => state.category.categories);

  const openCategoriesMenu = () => {
    setCategoriesOpen(!categoriesOpen);
    setTimeout(() => {
      setCategoriesOpen(false);
    }, 10000);
  };

  const fetchAllLessons = () => {
    dispatch(fetchLessons());
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

  return (
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
  );
}

export default CategorySelect;
