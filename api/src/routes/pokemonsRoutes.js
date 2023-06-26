const { Router } = require("express");
//IMPORTAR LOS HANDLERS
const { getAllPokemonsHandler, getPokemonIdHandler, createPokemonHandler , getAllPokemonByNameHandler } = require("../handlers/pokemonsHandlers"); 

const pokemonsRoutes = Router();

//RUTAS

// GET | /pokemons
pokemonsRoutes.get("/", getAllPokemonsHandler);

// GET | /pokemons/:idPokemon
pokemonsRoutes.get("/:id", getPokemonIdHandler);

// GET | /pokemons/name?="..."
pokemonsRoutes.get("/name/:name", getAllPokemonByNameHandler);

// POST | /pokemons
pokemonsRoutes.post("/", createPokemonHandler);


module.exports = pokemonsRoutes;