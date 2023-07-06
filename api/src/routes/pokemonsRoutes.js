const { Router } = require("express");
//IMPORTAR LOS HANDLERS
const { getAllPokemonsHandler, getPokemonIdHandler, createPokemonHandler  } = require("../handlers/pokemonsHandlers"); 

const pokemonsRoutes = Router();

//RUTAS

// GET | /pokemons
pokemonsRoutes.get("/", getAllPokemonsHandler);

// GET | /pokemons/:idPokemon
pokemonsRoutes.get("/:id/:source", getPokemonIdHandler);

// POST | /pokemons
pokemonsRoutes.post("/", createPokemonHandler);


module.exports = pokemonsRoutes;