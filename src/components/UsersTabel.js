import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers } from "../redux/slices/userSlice";
import { approveUser } from "../redux/slices/userSlice";
import { removeUser } from "../redux/slices/userSlice";
import { blockUser } from "../redux/slices/userSlice";
import { makeAdmin } from "../redux/slices/userSlice";

import Loader from "./Loader";

import noImg from "../images/no-entry.png";
import yesImg from "../images/yes.png";
import moreActionsImg from "../images/more_horiz.svg";

function UsersTabel() {
  const [tabelOpen, setTabelOpen] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const users = useSelector((state) => state.user.users);
  const usersStatus = useSelector((state) => state.user.usersStatus);

  const expandModal = (id) => {
    setExpandedRow((prevRow) => (prevRow === id ? null : id));
  };

  const handleApproveUser = (id) => {
    dispatch(approveUser(id));
  };

  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  };

  const handleBlockUser = (id) => {
    dispatch(blockUser(id));
  };

  const handleMakeAdmin = (id) => {
    dispatch(makeAdmin(id));
  };

  const handleCloseTabel = () => {
    setTabelOpen(!tabelOpen);
  };

  return (
    <>
      <h2 className="users-panel-title">Список пользоватей</h2>
      <div className="users-panel">
        {usersStatus == "loading" && <Loader auto={true} />}
        {usersStatus !== "loading" && (
          <>
            <div onClick={handleCloseTabel} className="users-panel__head-wrapper">
              <div className="users-panel__head">Имя &#8595;</div>
              <div className="users-panel__head">Отдел &#8595;</div>
              <div className="users-panel__head">Роль &#8595;</div>
              <div className="users-panel__head">Допусчен &#8595;</div>
              <div className="users-panel__head">Действие &#8595;</div>
            </div>
            <div className={`users-panel__info ${tabelOpen ? "" : "users-panel__info--hide"}`}>
              {users.map((user) => {
                return (
                  <Fragment key={user._id}>
                    <div className="users-panel__column">{user.fullName}</div>
                    <div className="users-panel__column">{user.workPosition}</div>
                    <div className="users-panel__column">{user.role == "admin" ? "Администратор" : "Ученик"}</div>
                    <div className="users-panel__column">
                      {user.approved ? <img src={yesImg} alt="" /> : <img src={noImg} alt="" />}
                    </div>
                    <div className="users-panel__column users-panel__column--action">
                      <img src={moreActionsImg} alt="" onClick={() => expandModal(user._id)} />
                      {expandedRow === user._id && (
                        <div className="actions">
                          <button onClick={() => handleApproveUser(user._id)} className="actions__btn">
                            Допустить
                          </button>
                          <button onClick={() => handleBlockUser(user._id)} className="actions__btn">
                            Закрыть доступ
                          </button>
                          <button onClick={() => handleRemoveUser(user._id)} className="actions__btn">
                            Удалить
                          </button>
                          <button onClick={() => handleMakeAdmin(user._id)} className="actions__btn">
                            Сделать администратором
                          </button>
                        </div>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </>
        )}
      </div>
      {!tabelOpen && <p className="users-panel__p">Нажмите, чтобы развернуть таблицу*</p>}
    </>
  );
}

export default UsersTabel;
