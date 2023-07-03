const axios = require("axios");

const { Pokemon, Type } = require("../db");

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
        image:element.sprites?.other.dream_world.front_default,
    }
}

// 📍 GET | /pokemons
// Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.
const getAllPokemons = async (offset) => {
    const pokemonsDb = await Pokemon.findAll({
        include:{
            model:Type,
            as: "pokemonTypes",
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
        // ?offset=0&limit=20%27
    });//está trayendo todos los pokemons que estén en la database de manera asíncrona porque el método findAll es asíncrono por eso va un await. 
    const infoApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`)).data; //trae toda la info de pokemons desde la api y es asíncrona porque es una petición a la api. 
    const pokemonsApi = infoApi.results; //acá estamos trayendonos efectivamente la info que queremos de los pokemons desde la api, por eso ponemos results. 
    const infoPokemons = await Promise.all(
        pokemonsApi.map(async (pokemon) => {
            const url = await axios.get(pokemon.url);
            return pokemonFormater(url.data)  
        })
    )
    return [...pokemonsDb, ...infoPokemons]; //aquí se juntan en un solo array todos los pokemons tanto de la api como de la db, por eso utilizamos un spread operator.
};

// 📍 GET | /pokemons/:idPokemon
// Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
// El pokemon es recibido por parámetro (ID).
// Tiene que incluir los datos del tipo de pokemon al que está asociado.
// Debe funcionar tanto para los pokemones de la API como para los de la base de datos.
const getPokemonById = async (id, source) => { //será una función asíncrona que está recibiendo id y source por parámetro
    console.log(id);
    const pokemon = 
    source === "api" // si la fuente es igual a api, tendrá dos opciones //utilizamos la dependencia axios para hacer llamadas asincrónicas  
    ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data //acá llamamos a la url externa por el api. //utilizamos temple strings porque el id es DINÁMICO
    : await Pokemon.findOne({ where: { id : id } ,include:{
        model:Type,
        as: "pokemonTypes",
        attributes:["name"],
        through:{
            attributes:[]
        }
    } }); //si la fuente no es la api y es la base de datos, utilizamos el método findByPk, ayuda a acelerar la búsqueda del id. OJO, que también es un método asincrónico, por eso va el await
    console.log(pokemon);
    return  source === "api"  ? pokemonFormater(pokemon) :pokemon;
}

// 📍 GET | /pokemons/name?="..."
// Esta ruta debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el pokemon, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
const getPokemonByName = async (name, source) => {
    let array_poke =[]
    let nameInLowerCase = name.toLowerCase();
    const pokemon = 
    source === "api" 
    ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameInLowerCase}`)).data
    : await Pokemon.findAll({ where: { name: nameInLowerCase } })
    let p = pokemonFormater(pokemon)
    array_poke.push(p)
    console.log(array_poke);
    return array_poke;
    // return pokemonFormater(pokemon);
}


// 📍 POST | /pokemons
// Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos).
const createPokemonDb = async (id, name, image, hp, attack, defense, speed, height, weight,type1,type2) => {
    const pokemon = await Pokemon.create({id, name, image, hp, attack, defense, speed, height, weight})

    const typePokemon1 = await Type.findOne({where:{name:type1}})    
       
    await pokemon.addPokemonTypes(typePokemon1)
        
    if(type2){
        const typePokemon2 = await Type.findOne({where:{name:type2}})
          
        await pokemon.addPokemonTypes(typePokemon2) 
    }
    await pokemon.save()
    

    return pokemon;

    // return await Pokemon.create({id, name, image, hp, attack, defense, speed, height, weight, types});
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    createPokemonDb
};