const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
  ratings: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "FILTER_BY_GENRE":
      const allVideogames = state.allVideogames;
      const videogamesGenre = allVideogames.map((e) => e.genres);
      console.log(videogamesGenre);
      const genreFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((videogames) =>
              videogames.genres.find((el) => el.name === action.payload)
            );
      return {
        ...state,
        videogames: genreFiltered,
      };

    case "FILTER_BY_RATING":
      const allVideogamesRate = state.allVideogames;
      const vgRatings = allVideogamesRate.map((e) => e.ratings);
      console.log(vgRatings);
      const ratingFiltered =
        action.payload === "All"
          ? allVideogamesRate
          : allVideogamesRate.filter(
              (videogames) => videogames.ratings === action.payload
            );
      return {
        ...state,
        videogames: ratingFiltered,
      };

    case "FILTER_BY_CREATED":
      const allVideogames2 = state.allVideogames;
      const createdFilter =
        action.payload === "created"
          ? allVideogames2.filter((el) => el.createdInDb)
          : allVideogames2.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : createdFilter,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedArr,
      };

    case "GET_VIDEOGAMES_NAMES":
      return {
        ...state,
        videogames: action.payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
