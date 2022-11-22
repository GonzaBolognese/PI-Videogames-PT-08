import React from "react";
import "./Card.css";

export default function Card({ id, name, genres, background_image }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <img src={background_image} alt="img not found" />
        <button className="span">{name}</button>
        <div className="cardBody">{genres + " "}</div>
      </div>
    </div>
  );
}
