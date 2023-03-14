import { useState } from "react";

import QuestionsList from "./QuestionsList";
import CreateQuestion from "./CreateQuestion";

function Test({ lesson, userInfo, questions }) {
  const [create, setCreate] = useState(false);

  return (
    <div className="test">
      {create ? (
        <CreateQuestion setCreate={setCreate} lesson={lesson} />
      ) : (
        <QuestionsList userInfo={userInfo} questions={questions} lesson={lesson} setCreate={setCreate} />
      )}
    </div>
  );
}

export default Test;
