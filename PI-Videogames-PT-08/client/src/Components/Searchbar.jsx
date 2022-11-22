import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesNames } from "../Actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesNames(name));
  }

  return (
    <div className="container">
      <input
        className="search"
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Search"
      />
      <button
        className="buttonSrc"
        onClick={(e) => handleOnSubmit(e)}
        type="submit"
      >
        Go!
      </button>
    </div>
  );
}
