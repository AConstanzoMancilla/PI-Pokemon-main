import { GET_BY_NAME, GET_POKEMONS, GET_BY_ID, GET_TYPES, FILTER_TYPE, FILTER_ORDER, FILTER_ORIGIN } from './action-types';

const initialState = {
    pokemons: [],
    pokemonsCopy: [], //hacemos una copia porque si filtramos el state se puede modificar completo y esa no es la idea
    pokemonsCopyBySource : [],
    pokemon: {},
    types: [],
    source: "api"
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case GET_POKEMONS:
            let pokemonsOriginHome = [...payload]
            if(state.source === "api"){
                pokemonsOriginHome = pokemonsOriginHome.filter(pokemon => !pokemon.created);
            }
            return {
                ...state,
                pokemons: pokemonsOriginHome,
                pokemonsCopy: payload ,
                pokemonsCopyBySource : pokemonsOriginHome
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
        case GET_TYPES:
            return {
                ...state,
                types: payload
            }
        case FILTER_TYPE:
            const pokemonFiltered = 
            payload === "default" 
            ? state.pokemonsCopyBySource 
            : state.pokemonsCopyBySource.filter(poke => poke.types.includes(payload))
            return {
                ...state,
                pokemons: pokemonFiltered
            }
        case FILTER_ORDER:
            const pokemonsOrdered = [...state.pokemonsCopyBySource]
            if(payload === 'Ascendant'){
                pokemonsOrdered.sort((a,b)=> {      //A = Orden alfabetico de manera ascendete
                    if (a.name < b.name) {
                        return -1;
                      }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }) 
            }
            if(payload === 'Descendent'){
                pokemonsOrdered.sort((a,b)=> {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })
            }
            if(payload === 'High Attack'){
                pokemonsOrdered.sort((a,b)=> a.attack - b.attack)
            }
            if(payload === 'Low Attack'){
                pokemonsOrdered.sort((a,b)=> b.attack - a.attack)
            }
            return {
                ...state,
                pokemons: pokemonsOrdered
            }
        case FILTER_ORIGIN:
            let pokemonsOrigin = [...state.pokemonsCopy]
            if(payload === "db"){
                pokemonsOrigin = pokemonsOrigin.filter(pokemon => pokemon.created);
            }
            if(payload === "api"){
                pokemonsOrigin = pokemonsOrigin.filter(pokemon => !pokemon.created);
            }
            return {
                ...state,
                pokemons: pokemonsOrigin,
                pokemonsCopyBySource : pokemonsOrigin
            }
        default:
            return {
                ...state
            };
    }
}

export default rootReducer;