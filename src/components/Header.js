import { useState } from "react";
import { Link } from "react-router-dom";

import SearchInput from "./SearchInput";
import CategorySelect from "./CategorySelect";
import UserInfo from "./UserInfo";

import profile from "../images/profile.svg";
import create from "../images/createLesson.svg";
import addCategory from "../images/addCategory.png";
import usersImg from "../images/usersPanel.png";

function Header({ userInfo }) {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className="header">
        <div className="header__left">
          <SearchInput userInfo={userInfo} />
          <CategorySelect userInfo={userInfo} />
          {userInfo.role == "admin" && (
            <>
              <Link className="add-category-link" to="/category">
                <img src={addCategory} alt="" />
              </Link>
              <Link className="add-category-link add-category-link--users" to="/users">
                <img src={usersImg} alt="" />
              </Link>
            </>
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
      <UserInfo userInfo={userInfo} open={open} toggleModal={toggleModal} setOpen={setOpen} />
    </>
  );
}

export default Header;
