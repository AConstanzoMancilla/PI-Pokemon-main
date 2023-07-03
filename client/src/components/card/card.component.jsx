import './card.styles.css';
import { Link } from 'react-router-dom';

function Card({pokemon}) {
  
  const { name, types, image, id} = pokemon
  const source = pokemon.created ? 'db':'api'
  return (
    <div className="card-container">
      <h2>Name:{name}</h2>
      <img src={image}/>
      <p>Types:{types}</p>
      
      <button>
      <Link to={`/detail/${id}/${source}`}>Details</Link>
      </button>
      
    </div>
  );
}

export default Card;
