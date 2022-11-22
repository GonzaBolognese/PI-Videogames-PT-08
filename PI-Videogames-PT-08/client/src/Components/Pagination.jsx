import React from "react";
import "./Pagination.css";

export default function Paged({ videogamesPerpage, allVideogames, paged }) {
  let pageNumbers = [];

  for (let i = 1; i < Math.ceil(allVideogames / videogamesPerpage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="numbers" key={number}>
              <a className="abtn" onClick={() => paged(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
