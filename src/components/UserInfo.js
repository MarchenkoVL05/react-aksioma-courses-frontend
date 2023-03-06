import logo from "../images/logo-white.svg";

function UserInfo({ userInfo, open, toggleModal, setOpen }) {
  const logOut = () => {
    localStorage.removeItem("token");
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      {open && <div onClick={toggleModal} className="overlay"></div>}
      {open && (
        <div className="userInfo">
          <div className="userInfo__bg">
            <img src={logo} alt="" />
            <div className="userInfo__name">{userInfo.fullName}</div>
            <div className="userInfo__workPosition">{userInfo.workPosition}</div>
          </div>
          <div className="userInfo__role">{userInfo.role == "admin" ? "Администратор" : "Ученик"}</div>
          <div className="userInfo__approved">
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

export default UserInfo;
