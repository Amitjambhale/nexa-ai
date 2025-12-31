import React from "react";
import "./loader.scss";

const Loader = ({ size = 40, color = "#ff5722" }) => {
  return (
    <div
      className="loaderWrapper"
      style={{ width: size, height: size, "--loader-color": color }}
    >
      <div className="bounce">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
