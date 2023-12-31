import './cards.styles.css';

import Card from '../card/card.component';

function Cards({allPokemons}) {
  
  const pokemonsList = allPokemons
  return (
    <div className="cards-list">
      {pokemonsList?.map(pokemon => //acá estamos mapeando las cards, si es que hay alguien en la pokemonsList y renderizamos una card 
        <Card pokemon = {pokemon} key={pokemon.id} id={pokemon.id}/>)}
    </div>
  );

}

export default Cards;