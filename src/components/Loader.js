import React from "react";
import { ProgressBar } from "react-loader-spinner";

// #a38ffd - main color

function Loader({ auto }) {
  return (
    <div className={auto ? "loader loader--auto" : "loader"}>
      <ProgressBar
        height="120"
        width="120"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#a38ffd"
        barColor="#a38ffd"
      />
    </div>
  );
}

export default Loader;
