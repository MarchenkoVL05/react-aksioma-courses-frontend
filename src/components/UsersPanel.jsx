import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers } from "../redux/slices/userSlice";
import { approveUser } from "../redux/slices/userSlice";
import { removeUser } from "../redux/slices/userSlice";

import Loader from "../components/Loader";

import noImg from "../images/no-entry.png";
import yesImg from "../images/yes.png";
import moreActionsImg from "../images/more_horiz.svg";

function UsersPanel() {
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

  return (
    <div className="wrapper">
      <div className="users-panel">
        {usersStatus == "loading" && <Loader auto={true} />}
        {usersStatus !== "loading" && (
          <>
            <div className="users-panel__head-wrapper">
              <div className="users-panel__head">Имя</div>
              <div className="users-panel__head">Отдел</div>
              <div className="users-panel__head">Роль</div>
              <div className="users-panel__head">Допусчен</div>
              <div className="users-panel__head">Действие</div>
            </div>
            <div className="users-panel__info">
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
                          <button className="actions__btn">Закрыть доступ</button>
                          <button onClick={() => handleRemoveUser(user._id)} className="actions__btn">
                            Удалить
                          </button>
                          <button className="actions__btn">Сделать администратором</button>
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
    </div>
  );
}

export default UsersPanel;
