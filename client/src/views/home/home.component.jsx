import { useEffect ,useState} from 'react'; //ciclo de vida 
import { useDispatch, useSelector } from 'react-redux'; //sirven para conectarnos con redux porque realmente son hooks que vienen de react

import NavBar from '../../components/navBar/navBar.component';
import Cards from '../../components/cards/cards.component';
import Filters from '../../components/filters/filters.component';
import {getPokemons} from '../../redux/actions';


import './home.styles.css';

function Home() {

  const dispatch = useDispatch(); //forma que le comunico/envío una action a la store
  const allPokemons = useSelector((state) => state.pokemons); //estamos creando un state y con useSelector se indica a qué estado(del reducer) está suscrito el componente 
  
  const [currentPage, setCurrentPage] = useState(0); //estado local para ver en qué pagina estoy actualmente
  const pokemonsPerPage = 12; //esto muestra el inicio de los pokemons

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    if(currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => { //en este caso se trae a los pokemons cuando la página se monta
    dispatch(getPokemons((currentPage) * pokemonsPerPage)) 
  }, [dispatch,currentPage]) //el array de dependencias es para ver en qué momento quiero que se ejecute la action, en este caso es cuando se monta 
  
  return (
    <div className="home">
      <NavBar/>
      <Filters/>
      <Cards allPokemons = {allPokemons} />







      <div className='buttoncontainer'>
        <button className="buttonPage" onClick={() => previousPage()}>Previus page</button>
        <button className="buttonPage" onClick={() => nextPage()}>Next page</button>
       
      </div>

      
   
    
    </div>
  );
}

export default Home;
