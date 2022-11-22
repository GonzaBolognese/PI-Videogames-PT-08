const axios = require("axios");
const { Genres, Videogame } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );

  const Api = await apiUrl.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      description: el.description_raw,
      released: el.released,
      ratings: el.ratings[0].title,
      background_image: el.background_image,
      platforms: el.parent_platforms.map((e) => e.platform.name),
      genres: el.genres,
    };
  });
  return Api;
};

const getNextInfo = async () => {
  var apiInfoNext = [];
  for (let i = 2; i < 7; i++) {
    const apiNext = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&&page=${i}`
    );
    apiInfoNext.push(
      await apiNext.data.results.map((el) => {
        return {
          id: el.id,
          name: el.name,
          description: el.description_raw,
          released: el.released,
          ratings: el.ratings[0].title,
          background_image: el.background_image,
          platforms: el.parent_platforms.map((e) => e.platform.name),
          genres: el.genres,
        };
      })
    );
  }
  return apiInfoNext;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: Genres,
    attributes: ["name"],
    through: {
      attributes: [],
    },
  });
};

const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const nextInfo = await getNextInfo();
  const allInfo = apiInfo
    .concat(nextInfo[0])
    .concat(nextInfo[1])
    .concat(nextInfo[2])
    .concat(nextInfo[3]);
  return allInfo;
};

const getAllVideogames = async () => {
  let apiInfo = await getAllInfo();
  let dbInfo = await getDbInfo();
  let totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllVideogames,
};
