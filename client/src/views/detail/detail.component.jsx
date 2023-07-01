import './detail.styles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById } from '../../redux/actions'
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  
  const dispatch = useDispatch();
  
  const pokemon = useSelector((state) => state.pokemon)

  useEffect(() => { //ciclo de vida del componente, en este caso se renderiza cuando se monta. 
    dispatch(getPokemonById(id));
  }, [id]); //array de dependencias: UseEffect se vuelve a ejecutar cuando cambia el id o el dispatch.  

  let types = ""
  if(pokemon.types) { //si existe un types en la propiedad pokemon del global state
    types=pokemon.types //que dentro de types aparezca pokemon.types
  } else if (pokemon.Types) { //pero si en el model Type, existe busca los types del model.  
    types = pokemon.Types.map(types=>types.name)
    types = types.join(" & ") //junta dos types     
  }

  return (
    <div key={pokemon.id}>
      <h1>Name:{pokemon.name}</h1>
      <h2>Id:{pokemon.id}</h2>
      <h2>Hp:{pokemon.hp}</h2>
      <h2>Attack:{pokemon.attack}</h2>
      <h2>Defense:{pokemon.defense}</h2>
      <h2>Speed:{pokemon.speed}</h2>
      <h2>Height:{pokemon.height}</h2>
      <h2>Weight:{pokemon.weight}</h2>
      <h2>Types:{types}</h2>

      <div>
        <img src={pokemon.image}/>
      </div>
  
    </div>
  );
}

export default Detail;