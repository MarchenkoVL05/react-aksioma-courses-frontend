import waitImg from "../images/wait.png";

function WaitApprovePage() {
  return (
    <div className="auth-wrapper">
      <div className="wait-approve-box">
        <img src={waitImg} alt="" />
        <div className="wait-warning">Уведомление</div>
        <h1 className="wait-title">Администратор ещё не допустил вас к курсам</h1>
        <h6 className="wait-subtitle">Подождите немного или обратитесь к администратору.</h6>
      </div>
    </div>
  );
}

export default WaitApprovePage;
