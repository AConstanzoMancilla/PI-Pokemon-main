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
    const source = isNaN(id) ? "db" : "api" //Verificamos que la fuente sea un número(buscará en api) o un string(buscará en db)

    try {
        const response = await getPokemonById(id, source);
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
    getAllPokemonByNameHandler
}





 