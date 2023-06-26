const { getAllPokemons, getPokemonById, getPokemonByName, createPokemonDb,} = require("../controllers/pokemonsControllers");

// 📍 GET | /pokemons
const getAllPokemonsHandler = async (req, res) => {
    const {name} = req.query;

    try {
        if(name){
            const pokemonByName = await getPokemonByName(name);
            res.status(200).json(pokemonByName);
        }else{
            const response = await getAllPokemons();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// 📍 GET | /pokemons/:idPokemon
const getPokemonIdHandler = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "db" : "api" //Verificamos que el number es un número(api) o un string(db)

    try {
        const response = await getPokemonById(id,source);
        console.log(response)
        res.status(200).json(response); 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// 📍 GET | /pokemons/name?="..."
const getAllPokemonByNameHandler = async (req, res) => {
    const {name} = req.params;
    const source = "api"

    try {
        const pokemonByName = await getPokemonByName(name, source);
        res.status(200).json(pokemonByName);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// 📍 POST | /pokemons
const createPokemonHandler = async (req, res) => {
    const { id, name, image, life, attack, defense, speed, height, weight , types} = req.body;

    try {
        const response = await createPokemonDb(id, name, image, life, attack, defense, speed, height, weight,types);
        res.status(200).json(response); 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllPokemonsHandler,
    getPokemonIdHandler,
    createPokemonHandler,
    getAllPokemonByNameHandler
}





 