import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="spinner">
      <div class="drawing" id="loading">
        <h1>LOADING</h1>
        <div class="loading-dot"></div>
      </div>
    </div>
  );
}
