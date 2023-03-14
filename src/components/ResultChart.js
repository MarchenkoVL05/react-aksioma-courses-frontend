import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ResultChart = ({ result }) => {
  let useScore = (result.score / result.questionCounter) * 100;

  function formatNumber(num) {
    if (Number.isInteger(num)) {
      return num;
    } else {
      return num.toFixed(1);
    }
  }

  return (
    <div className="result-container">
      <h3 className="result-heading">Ваш результат:</h3>
      <div className="chart-container">
        <div className="chart-background" />
        <CircularProgressbar
          value={formatNumber(useScore)}
          text={`${formatNumber(useScore)}%`}
          strokeWidth={10}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "24px",
            pathTransitionDuration: 0.5,
            pathColor: `#a38ffd`,
            textColor: "#a38ffd",
            trailColor: "#d6d6d6",
            background: {
              fill: "#fff",
              opacity: 0,
            },
          })}
        />
        <div className="chart-overlay" />
      </div>
      <div className="result-text">
        {useScore >= 70 ? (
          <div className="result-text-container">
            <i className="fas fa-smile fa-2x result-icon"></i>
            <p className="result-message">Отличный результат!</p>
          </div>
        ) : (
          <div className="result-text-container">
            <i className="fas fa-frown fa-2x result-icon"></i>
            <p className="result-message">Нужно еще немного потренироваться.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultChart;
