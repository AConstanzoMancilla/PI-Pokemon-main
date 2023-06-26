const axios = require("axios");

const { Pokemon } = require("../db");

const pokemonFormater = (element)=>{
    return {
        id:element?.id,
        name:element?.name,
        hp:element.stats[0]?.base_stat,
        attack: element.stats[1]?.base_stat,
        defense:element.stats[2]?.base_stat,
        speed:element.stats[5]?.base_stat,
        height:element?.height,
        weight:element?.weight,
        types:element.types?.map((t)=>t.type.name).join(" & "),
        image:element.sprites?.front_default,
    }
}

// 📍 GET | /pokemons
// Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.
const getAllPokemons = async () => {
    const pokemonsDb = await Pokemon.findAll();
    const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data;
    const pokemonsApi = infoApi.results;
    return [...pokemonsDb, ...pokemonsApi]; //aquí se junta toda la info tanto de la api como de la db
};
    
// 📍 GET | /pokemons/:idPokemon
// Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
// El pokemon es recibido por parámetro (ID).
// Tiene que incluir los datos del tipo de pokemon al que está asociado.
// Debe funcionar tanto para los pokemones de la API como para los de la base de datos.
const getPokemonById = async (id, source) => { //extrayendo la info con el .data
    const pokemon = 
    source === "api" 
    ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
    : await Pokemon.findByPk(id);
    return pokemonFormater(pokemon);
}


// 📍 GET | /pokemons/name?="..."
// Esta ruta debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el pokemon, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
const getPokemonByName = async (name,source) => {
    console.log('name',name);
    const pokemon = 
    source === "api" 
    ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
    :null;
    return pokemonFormater(pokemon);
}

// 📍 POST | /pokemons
// Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos).
const createPokemonDb = async (id, name, image, life, attack, defense, speed, height, weight, types ) => {
    return await Pokemon.create({id, name, image, life, attack, defense, speed, height, weight, types});
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    createPokemonDb
};