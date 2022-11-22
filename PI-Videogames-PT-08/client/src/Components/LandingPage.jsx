import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landingBody">
      <div className="glass">
        <h1 className="welcome">HENRY GAMERS </h1>
        <Link to="/home" element={<Home />}>
          <button className="button">Press Start</button>
        </Link>
      </div>
    </div>
  );
}
