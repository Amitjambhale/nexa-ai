import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./loader.scss";

function PercentageLoader({ percentage }) {
  return (
    <div className="percentage_loader">
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div>
  );
}

export default PercentageLoader;
