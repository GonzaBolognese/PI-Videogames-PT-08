import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");

    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function filterVideogmeByGenre(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterByRating(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_RATING",
    payload,
  };
}

export function filterCreated(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  console.log(payload);
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getVideogamesNames(name) {
  return async function (dispatch) {
    try {
      console.log(name);
      var json = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      return dispatch({
        type: "GET_VIDEOGAMES_NAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    var info = await axios("http://localhost:3001/genres");
    return dispatch({ type: "GET_GENRES", payload: info.data });
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const response = axios.post("http://localhost:3001/videogame", payload);
    return response;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var result = await axios.get(`http://localhost:3001/videogame/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
