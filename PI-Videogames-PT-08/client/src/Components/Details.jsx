import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getDetail } from "../Actions/index";
import { useEffect } from "react";
import "./Details.css";

export default function Details(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const myVideogame = useSelector((state) => state.detail);
  return (
    <div>
      <div className="mainContDet">
        <header className="header">
          <h1 className="title">HENRY GAMES</h1>
        </header>
        <div className="cardDetail">
          <div className="cardLeft">
            <img
              className="imgDetail"
              src={myVideogame.background_image}
              alt="background"
            />
          </div>
          <div className="cardRight">
            <h1 className="titleDetail">{myVideogame.name}</h1>
            <ul>
              <li>Genre: {myVideogame.genres + " "}</li>
              <li>Platforms: {myVideogame.platforms + " "}</li>
              <li>Release Date : {myVideogame.released}</li>
            </ul>
            <p>{myVideogame.description}</p>
            <p className="genreDetail">{myVideogame.ratings + " "}</p>
          </div>
        </div>
      </div>
          <Link to="/home">
            <button className="backButtonDet">Back</button>
          </Link>
    </div>
  );
}
