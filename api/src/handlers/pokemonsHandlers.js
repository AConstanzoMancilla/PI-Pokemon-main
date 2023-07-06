const { getAllPokemons, getPokemonById, getPokemonByName, createPokemonDb,} = require("../controllers/pokemonsControllers");

// 📍 GET | /pokemons
const getAllPokemonsHandler = async (req, res) => {
    const {name, offset} = req.query;
    const source = "api"

    try {
        if(name){
            const pokemonByName = await getPokemonByName(name, source);
            res.status(200).json(pokemonByName);
        }else{
            const response = await getAllPokemons(offset);
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// 📍 GET | /pokemons/:idPokemon
const getPokemonIdHandler = async (req, res) => {
    const {id, source} = req.params;
   
    try {
        const response = await getPokemonById(id, source);
        res.status(200).json(response); 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// 📍 POST | /pokemons
const createPokemonHandler = async (req, res) => {
    const { id, name, image, hp, attack, defense, speed, height, weight,type1,type2} = req.body; //llega info por body y la recibe el handler, la extrae del body

    try { //sirve para manejar errores
        const response = await createPokemonDb(id, name, image, hp, attack, defense, speed, height, weight,type1,type2);//invocaba a nuestro controller y le pasamos la info
        res.status(200).json(response); 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllPokemonsHandler,
    getPokemonIdHandler,
    createPokemonHandler,
}





 