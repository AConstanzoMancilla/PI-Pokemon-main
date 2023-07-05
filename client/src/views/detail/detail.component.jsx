import './detail.styles.css';
import { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById } from '../../redux/actions'
import { useParams } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar.component';


function Detail() {
  const { id , source} = useParams();
  
  const dispatch = useDispatch();
  
  const pokemon = useSelector((state) => state.pokemon)

  useEffect(() => { //ciclo de vida del componente, en este caso se renderiza cuando se monta. 
    dispatch(getPokemonById(id,source));
  }, [id]); //array de dependencias: UseEffect se vuelve a ejecutar cuando cambia el id o el dispatch.  

  let types = ""
  
  if(!pokemon.pokemonTypes) { //si existe un types en la propiedad pokemon del global state
    types=pokemon.types //que dentro de types aparezca pokemon.types
  } else if (pokemon.Types) { //pero si en el model Type, existe busca los types del model.  
    types =stringType(pokemon.pokemonTypes) //junta dos types     
  }
  useEffect(() => { //ciclo de vida del componente, en este caso se renderiza cuando se monta. 
  
  }, [pokemon]);
 
  


  
const stringType = ( pokemonTypes) => {
  if(pokemonTypes.length > 1 ){
      return pokemonTypes[0].name +" & "+  pokemonTypes[1].name
  }else{
      return pokemonTypes[0].name
  }

}

  return (
    <div className="containerDetails">
      <NavBar/>
    <div className="details" key={pokemon.id}>
      <h1>Name:{pokemon.name}</h1>
      <hr/>
      <h2># Id:{pokemon.id}</h2>
      <h2>❣️ Hp:{pokemon.hp}</h2>
      <h2>⚔ Attack:{pokemon.attack}</h2>
      <h2>🛡 Defense:{pokemon.defense}</h2>
      <h2>👣 Speed:{pokemon.speed}</h2>
      <h2>📊 Height:{pokemon.height}</h2>
      <h2>⚖ Weight:{pokemon.weight}</h2>
      <h2>🧬 Types:{pokemon.types ? pokemon.types : pokemon.pokemonTypes? stringType(pokemon.pokemonTypes) :  null }</h2>
    </div>
    <div className="image-container">
      <img src={pokemon.image}/>
    </div>
  
  
    
    </div>
  );
}

export default Detail;