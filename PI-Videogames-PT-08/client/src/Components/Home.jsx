import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  filterVideogmeByGenre,
  filterCreated,
  orderByName,
  filterByRating,
} from "../Actions";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./Searchbar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allgenres = useSelector((state) => state.genres);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  const paged = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleGenre(e) {
    e.preventDefault();
    dispatch(filterVideogmeByGenre(e.target.value));
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(filterByRating(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  return (
    <div className="Home" key={currentPage.toString()}>
      <header className="header">
        <h1 className="title">HENRY GAMES</h1>
        <SearchBar />
      </header>
      <div className="filterCont">
        <select className="selectBar" onChange={(e) => handleSort(e)}>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <select className="selectBar" onChange={(e) => handleGenre(e)}>
          <option value="All">All</option>
          <option value="Adventure">Adventure</option>
          <option value="Indie">Indie</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Platformer">Platformer</option>
          <option value="Racing">Racing</option>
          <option value="Sports">Sports</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="RPG">RPG</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Action">Action</option>
          <option value="Arcade">Arcade</option>
          <option value="Fighting">Fighting</option>
          <option value="Card">Card</option>
        </select>
        <select className="selectBar" onChange={(e) => handleRating(e)}>
          <option value="All">All</option>
          <option value="exceptional">exceptional</option>
          <option value="recommended">recommended</option>
          <option value="meh">meh</option>
        </select>
        <select className="selectBar" onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="existent">Existents</option>
        </select>
        <button
          className="ButtonBar"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload
        </button>
      </div>
      <div className="cardContainer">
        {currentVideogames?.map((el) => {
          return (
            <Link className="linkTodet" to={"/videogame/" + el.id}>
              <Card
                key={el.id}
                name={el.name}
                genres={el.genres?.map((e) => e.name)}
                background_image={el.background_image}
              />
            </Link>
          );
        })}
      </div>
      <Pagination
        allVideogames={allVideogames.length}
        paged={paged}
        currentPage={currentPage}
        videogamesPerpage={videogamesPerPage}
      />
      <footer className="footer">
        <Link className="createVid" to="/videogame">
          Create Videogame
        </Link>
      </footer>
    </div>
  );
}
