const axios = require("axios");
const { Router } = require("express");
const { getAllVideogames } = require("../Controllers/VideogamesCont");
const { Genres } = require("../db");
const { Videogame } = require("../db");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// [ ] __GET /videogames__:
//   - Obtener un listado de los videojuegos
//   - Debe devolver solo los datos necesarios para la ruta principal

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  let allVideogames = await getAllVideogames();
  if (name) {
    let videogameName = allVideogames.filter((ob) =>
      ob.name.toLowerCase().includes(name.toLowerCase())
    );
    videogameName.length
      ? res.status(202).send(videogameName)
      : res.status(404).send("Title not found");
  } else {
    res.status(202).send(allVideogames);
  }
});

// [ ] __GET /videogames?name="..."__:
//   - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//   - Si no existe ningún videojuego mostrar un mensaje adecuado

router.get("/videogame", async (req, res) => {
  const name = req.query.name;
  const allVideogames = await getAllVideogames();
  if (name) {
    const videogameName = allVideogames.filter((ob) => ob.name.includes(name));
    videogameName.length
      ? res.status(202).json(videogameName)
      : res.status(404).json("Title not found");
  }
  res.status(202).json(allVideogames);
});

// [ ] __GET /videogame/{idVideogame}__:
//   - Obtener el detalle de un videojuego en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//   - Incluir los géneros asociados

router.get("/videogame/:id", async (req, res) => {
  const { id } = req.params;
  if (id.includes("-")) {
    try {
      const videogameId = await Videogame.findByPk(id, { include: Genres });

      let genreId = {
        id: videogameId.id,
        name: videogameId.name,
        description: videogameId.description,
        released: videogameId.released,
        ratings: videogameId.ratings,
        platforms: videogameId.platforms,
        background_image: videogameId.background_image,
      };
      if (genreId) return res.status(200).json(genreId);
    } catch (error) {
      return res.status(404).json({ error: `Not found ${id}` });
    }
  } else {
    try {
      const apiGames = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      let genreId = {
        id: apiGames.data.id,
        name: apiGames.data.name,
        description: apiGames.data.description_raw,
        released: apiGames.data.released,
        ratings: apiGames.data.ratings[0].title,
        platforms: apiGames.data.parent_platforms.map((e) => e.platform.name),
        background_image: apiGames.data.background_image,
        genres: apiGames.data.genres.map((e) => e.name),
      };
      if (genreId) return res.status(200).json(genreId);
    } catch (error) {
      {
        return res.status(404).json({ error: `Error: ${id} not found` });
      }
    }
  }
});

// [ ] __GET /genres__:
//   - Obtener todos los tipos de géneros de videojuegos posibles
//   - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get("/genres", async (req, res) => {
  const videogamesApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  console.log(videogamesApi);
  const genres = await videogamesApi.data.results.map((e) => e.name);
  genres.map((p) => {
    Genres.findOrCreate({
      where: { name: p },
    });
  });
  const allGenres = await Genres.findAll();

  res.status(202).json(allGenres);
});

// [ ] __POST /videogame__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//   - Crea un videojuego en la base de datos

router.post("/videogame", async (req, res) => {
  let {
    name,
    description,
    release,
    rating,
    genres,
    platforms,
    background_image,
    createdInDb,
  } = req.body;
  try {
    let newGame = await Videogame.create({
      name,
      description,
      release,
      rating,
      platforms,
      background_image,
      createdInDb,
    });

    genres.forEach(async (e) => {
      let genresDb = await Genres.findAll({
        where: { name: e.name },
      });
      newGame.addGenre(Object.values(genresDb));
    });

    res.status(200).send(newGame);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// let {
//   name,
//   description,
//   released,
//   ratings,
//   genres,
//   platforms,
//   background_image,
// } = req.body;

// platforms = platforms.toString();
// const addVgame = await Videogame.create({
//   name,
//   description,
//   released,
//   ratings,
//   platforms,
//   genres,
//   background_image,
// });

// const vgGenre = await Genres.findAll({
//   where: { name: genres },
// });
// addVgame.addGenre(vgGenre);
// res.send("Videogame Created!");
