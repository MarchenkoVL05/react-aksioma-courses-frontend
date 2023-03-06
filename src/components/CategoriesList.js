import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/slices/categorySlice";

import axios from "../axios";

import removeCategoryImg from "../images/removeCategory.png";

function CategoriesList({ setError, setSuccess }) {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories]);

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
        setSuccess("Отдел, уроки и вопросы к ним удалены");
      } else {
        return;
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="categories-list">
      <ul>
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
  );
}

export default CategoriesList;
