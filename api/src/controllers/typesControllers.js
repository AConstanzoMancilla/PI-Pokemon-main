const axios = require("axios");

const { Type } = require("../db");

// 📍 GET | /types
// Obtiene un arreglo con todos los tipos de pokemones.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
const getAllTypes  = async () => {
    const typesDb = await Type.findAll();
    console.log( typesDb);
    if(typesDb.length === 0){
        const infoApi = (await axios.get("https://pokeapi.co/api/v2/type")).data.results;
        for(let i =0;i <= infoApi.length ; i++){
            let name  = infoApi[i].name 
            let id = (i+1)
            console.log( name);
            await Type.create({id, name});
        }
        return infoApi
       
    }
    return typesDb
}

module.exports = { 
    getAllTypes 
};