import { GET_BY_NAME, GET_POKEMONS, GET_BY_ID, GET_TYPES, FILTER_TYPE, FILTER_ORDER, FILTER_ORIGIN } from './action-types';

const initialState = {
    pokemons: [],
    pokemonsCopy: [], //hacemos una copia porque si filtramos el state se puede modificar completo y esa no es la idea
    pokemon: {},
    types: []
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
        case GET_TYPES:
            return {
                ...state,
                types: payload
            }
        case FILTER_TYPE:
            const filter_pokes = payload === "default" ? state.pokemonsCopy :  state.pokemonsCopy.filter(p=>
                p.types.includes(payload)
            )
            return {
                ...state,
                pokemons: filter_pokes
            }
        case FILTER_ORDER:
            const pokemnosTem = [...state.pokemonsCopy]
            if(payload === 'Ascendant'){
                pokemnosTem.sort((a,b)=> {      //A = Orden alfabetico de manera ascendete
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
                pokemnosTem.sort((a,b)=> {
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
                pokemnosTem.sort((a,b)=> a.attack - b.attack)
            }
            if(payload === 'Low Attack'){
                pokemnosTem.sort((a,b)=> b.attack - a.attack)
            }
            return {
                ...state,
                pokemons: pokemnosTem
            }
        case FILTER_ORIGIN:
            return {
                ...state,
                types: payload
            }
        default:
            return {
                ...state
            };
    }
}

export default rootReducer;