import axios from 'axios';
import { GET_POKEMONS, GET_BY_NAME, GET_BY_ID, GET_TYPES, FILTER_TYPE, FILTER_ORDER, FILTER_ORIGIN } from './action-types';

export const getPokemons = (offset) => {
    return async function (dispatch) {
    const pokemonsApi = await axios.get("http://localhost:3001/pokemons?offset="+offset);
    const pokemons = pokemonsApi.data.map((pokemon) => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            types:pokemon.types ? pokemon.types : stringType(pokemon.pokemonTypes) ,
            attack:pokemon.attack,
            hp:pokemon.hp,
            defense:pokemon.defense,
            speed:pokemon.speed,
            weight:pokemon.weight,
            height:pokemon.height,
            created:pokemon.created ? true : false
           
        }
    })
    dispatch({ 
        type: GET_POKEMONS, 
        payload: pokemons 
    });
    }
}

const stringType = ( pokemonTypes) => {
    if(pokemonTypes.length > 1 ){
        return pokemonTypes[0].name +" & "+  pokemonTypes[1].name
    }else{
        return pokemonTypes[0].name
    }

}

export const getPokemonByName = (name) => {
        return async function (dispatch) {
            try {
                const pokemonByName = await axios.get(`http://localhost:3001/pokemons?name=${name.toLowerCase()}`);
                const pokemon = pokemonByName.data
                dispatch({ 
                    type: GET_BY_NAME, 
                    payload: pokemon 
                });
            } catch (error) {
                alert(("This pokemon don't exist"))
            }
        
}}

export const getPokemonById = (id,source) => {
    return async function (dispatch) {
    const pokemonById = await axios.get(`http://localhost:3001/pokemons/${id}/${source}`);
    const pokemon = pokemonById.data
    dispatch({ 
        type: GET_BY_ID, 
        payload: pokemon 
    });
    }
}

export const getTypes = () => {
    return async function (dispatch) {
    const pokemonTypes = await axios.get(`http://localhost:3001/types`);
    const types = pokemonTypes.data
    dispatch({ 
        type: GET_TYPES, 
        payload: types 
    });
    }
}

export const filterType = (type) => {
    return {
        type: FILTER_TYPE, 
        payload: type
    }
}

export const filterOrder = (order) => {
    return {
        type: FILTER_ORDER, 
        payload: order
    }
}

export const filterOrigin = (origin) => {
    return {
        type: FILTER_ORIGIN, 
        payload: origin
    }
}