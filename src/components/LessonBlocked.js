import React from "react";
import blockedLessonImg from "../images/blockedLesson.png";

function LessonBlocked() {
  return (
    <div className="lesson-block">
      <img src={blockedLessonImg} alt="" />
      <p>Доступ будет открыт после прохождения предыдущего урока</p>
    </div>
  );
}

export default LessonBlocked;
