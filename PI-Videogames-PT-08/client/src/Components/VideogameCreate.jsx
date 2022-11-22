import React from "react";
import { useEffect, useState, dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, postVideogame } from "../Actions";
import "./VideogameCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!input.platforms) {
    errors.platforms = "Platform is required";
  }

  return errors;
}

export default function VideogameCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    ratings: "",
    genres: [],
    platforms: "",
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function deleteSelected() {
    let selected = document.getElementsByClassName('selected')

  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postVideogame(input));
    alert("Videogame Created!");
    setInput({
      name: " ",
      description: " ",
      image: " ",
      released: " ",
      ratings: " ",
      genres: [],
      platforms: " ",
    });
    navigate("/home");
  }

  return (
    <div className="containerPost">
      <header className="header">
        <h1 className="title">HENRY GAMES</h1>
      </header>
      <div className="mainscreen">
        <div className="rightsidePost">
          <form onSubmit={(e) => handleSubmit(e)} action="">
            <h1 className="titlePost">Create Videogame</h1>
            <label className="labelCardPost">Game title</label>
            <input
              type="text"
              className="inputbox"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              required
            />
            <label className="labelCardPost">Description</label>
            <input
              type="text"
              className="inputbox"
              name="description"
              id="card_number"
              value={input.description}
              onChange={(e) => handleChange(e)}
              required
            />
            <label className="labelCardPost">Image</label>
            <input
              type="text"
              className="inputbox"
              name="image"
              id="card_number"
              value={input.image}
              onChange={(e) => handleChange(e)}
              required
            />
            <label className="labelCardPost">Release Date</label>
            <input
              type="text"
              className="inputbox"
              name="released"
              value={input.released}
              onChange={(e) => handleChange(e)}
              required
            />
            <label className="labelCardPost">Ratings</label>
            <input
              type="text"
              className="inputbox"
              name="ratings"
              value={input.ratings}
              onChange={(e) => handleChange(e)}
              required
            />

            <label className="labelCardPost">Select Platform</label>
            <input
              type="text"
              className="inputbox"
              name="platforms"
              value={input.platforms}
              onChange={(e) => handleChange(e)}
              required
            />
            <label className="labelCardPost">Select Genre</label>
            <select
              onChange={(e) => handleSelect(e)}
              className="inputbox"
              name="card_type"
              id="card_type"
              required
            >
              {genres.map((genre) => (
                <option value={genre.name}>{genre.name}</option>
              ))}
            </select>
            <div className="selectedCont">
              <div className="selected">
                {input.genres.map((el) => el + " ")}
              </div>
            </div>

            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="button"
            >
              Submit
            </button>
          </form>
        </div>
        <Link to="/home">
          <button className="backButton">Back</button>
        </Link>
      </div>
    </div>
  );
}
