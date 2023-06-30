import { GET_BY_NAME, GET_POKEMONS, GET_BY_ID } from './action-types';

const initialState = {
    pokemons: [],
    pokemonsCopy: [], //hacemos una copia porque si filtramos el state se puede modificar completo y esa no es la idea
    pokemon: {}
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload,
                pokemonsCopy: payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                pokemons: payload
            }
        case GET_BY_ID:
            return {
                ...state,
                pokemon: payload
            }
        default:
            return {
                ...state
            };
    }
}

export default rootReducer;