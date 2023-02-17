import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import loop from "../images/loop.svg";
import profile from "../images/profile.svg";

function Header({ userInfo }) {
  return (
    <header className="header">
      <div className="header__left">
        <Link className="header__link" to="/">
          <img src={logo} alt="" />
        </Link>
        <div className="search">
          <img src={loop} alt="" />
          <input className="search__input" placeholder="Поиск" type="text" />
        </div>
        <div className="header__category">
          Отдел: <span>{userInfo.workPosition}</span>
        </div>
      </div>
      <a className="header__name" href="#">
        {userInfo.fullName} <img src={profile} alt="" />
      </a>
    </header>
  );
}

export default Header;
