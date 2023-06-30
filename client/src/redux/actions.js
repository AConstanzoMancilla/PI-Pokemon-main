import axios from 'axios';
import { GET_POKEMONS, GET_BY_NAME, GET_BY_ID } from './action-types';

export const getPokemons = () => {
    return async function (dispatch) {
    const pokemonsApi = await axios.get("http://localhost:3001/pokemons");
    const pokemons = pokemonsApi.data.map((pokemon) => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            types:pokemon.types,
            attack:pokemon.attack,
            hp:pokemon.hp,
            defense:pokemon.defense,
            speed:pokemon.speed,
            weight:pokemon.weight,
            height:pokemon.height
        }
    })
    dispatch({ 
        type: GET_POKEMONS, 
        payload: pokemons 
    });
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

export const getPokemonById = (id) => {
    return async function (dispatch) {
    const pokemonById = await axios.get(`http://localhost:3001/pokemons/${id}`);
    const pokemon = pokemonById.data
    dispatch({ 
        type: GET_BY_ID, 
        payload: pokemon 
    });
    }
}