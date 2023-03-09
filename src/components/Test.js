import { useState } from "react";

import QuestionsList from "./QuestionsList";
import CreateQuestion from "./CreateQuestion";

function Test({ lesson, userInfo, questions }) {
  const [create, setCreate] = useState(false);

  const handleCreateQuestion = () => {
    setCreate(true);
  };

  return (
    <div className="test">
      <h4 className="test__title">Проверка знаний</h4>
      {userInfo.role == "admin" && (
        <button onClick={handleCreateQuestion} className="test__btn-create">
          Добавить вопрос
        </button>
      )}
      {create ? (
        <CreateQuestion setCreate={setCreate} lesson={lesson} />
      ) : (
        <QuestionsList userInfo={userInfo} questions={questions} lesson={lesson} />
      )}
    </div>
  );
}

export default Test;
