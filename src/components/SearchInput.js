import React from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import loop from "../images/loop.svg";
import close from "../images/close.png";
import logo from "../images/logo.svg";

function SearchInput() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    </>
  );
}

export default SearchInput;
