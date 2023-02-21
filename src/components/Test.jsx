import React from "react";

function Test({ lesson }) {
  return (
    <>
      {console.log(lesson)}
      <div className="test">
        <h4 className="test__title">Проверка знаний</h4>
      </div>
    </>
  );
}

export default Test;
