import logo from "../images/logo.svg";

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

export default UserInfo;
