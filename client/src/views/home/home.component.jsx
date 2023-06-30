import { useEffect } from 'react'; //ciclo de vida 
import { useDispatch, useSelector } from 'react-redux'; //sirven para conectarnos con redux porque realmente son hooks que vienen de react

import NavBar from '../../components/navBar/navBar.component';
import Cards from '../../components/cards/cards.component';
import {getPokemons} from '../../redux/actions';

import './home.styles.css';

function Home() {

  const dispatch = useDispatch(); //forma que le comunico/envío una action a la store
  const allPokemons = useSelector((state) => state.pokemons); //estamos creando un state y con useSelector se indica a qué estado(del reducer) está suscrito el componente 
  
// FILTRO SOBRE EL STATE
// const[filtered, setFiltered] = useState(allPokemons)//creamos un estado local que toma al estado global como su estado inicial a allPokemons
  // const handleSubmit = (event) =>{//cuando yo le haga click me haga un filtro con el nombre si corresponde. 
  //   event.preventDefault();
  //   const filtered = allPokemons.filter(pokemon => 
  //     pokemon.name.includes(searchString)
  //   );
  //   setFiltered(filtered);
  // }

  useEffect(() => { //en este caso se trae a los pokemons cuando la página se monta
    dispatch(getPokemons())
  }, [dispatch]) //el array de dependencias es para ver en qué momento quiero que se ejecute la action, en este caso es cuando se monta 
  console.log(allPokemons);

  return (
    <div>
      <h2>Home</h2>
      <NavBar/>
      <Cards allPokemons = {allPokemons}/>
      
    </div>
  );
}

export default Home;
