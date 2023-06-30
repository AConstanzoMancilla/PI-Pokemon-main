import './card.styles.css';

function Card({pokemon}) {
  console.log(pokemon);

  const { name, types, image } =pokemon
  return (
    <div className="card-container">
      <h2>Name:{name}</h2>
      <img src={image}/>
      <p>Types:{types}</p>
    </div>
  );
}

export default Card;
