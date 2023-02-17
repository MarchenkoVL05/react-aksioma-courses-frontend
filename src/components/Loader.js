import React from "react";
import { FallingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader">
      <FallingLines color="#a38ffd" width="200" visible={true} ariaLabel="falling-lines-loading" />
    </div>
  );
}

export default Loader;
