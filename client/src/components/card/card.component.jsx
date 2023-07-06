import { Link } from 'react-router-dom';

import './card.styles.css';

function Card({pokemon}) {
  
  const { name, types, image, id} = pokemon
  const source = pokemon.created ? 'db':'api'

  return (
    <Link to={`/detail/${id}/${source}`}>
    <div className="card-container">
      <h2>Name: {name}</h2>
      <img className="image" src={image}/>
      <p>Types: {types}</p>
    </div>
    </Link>
  );
}

export default Card;
