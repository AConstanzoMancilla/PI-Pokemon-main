import './searchBar.styles.css';
import { useState } from 'react';
import { getPokemons, getPokemonByName } from '../../redux/actions';
import { useDispatch } from 'react-redux';


function SearchBar() {
  const [searchPokemon, setSearchPokemon] = useState('');
  
  const dispatch = useDispatch();

  const handleChange = (event) => { //manejador de cambios, en este caso el event es lo que va cambiando
    if(event.target.value === ''){ //este es el valor del event que en este caso va cambiando
      dispatch(getPokemons()) //aquí estamos haciendo dispatch de la action getPokemons dado que el event está vacío
    }
    setSearchPokemon(event.target.value); //esto pasa SI O SI, pues en este caso el event NO ESTÁ VACÍO
  }

  const handleSearch = () => { //manejador de búsqueda de pokemons
    dispatch(getPokemonByName(searchPokemon)) //aquí estamos haciendo dispatch de la action getPokemonByName, particularmente le pasamos por parámetro a lo que está escribiendo en el buscador, en este caso el estado local. 
  }
  
  const handleOnSubmit = (event) => { //manejador de presionar
    event.preventDefault();  //si el usuario presiona el Enter 
    if(searchPokemon.length !== 0){  
    handleSearch()
    }
  }


  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input placeholder="Find a pokemon" value={searchPokemon} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
  }

export default SearchBar;