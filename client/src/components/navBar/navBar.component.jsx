import SearchBar from '../searchBar/searchBar.component';
import './navBar.styles.css';
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <div className="navbar">
        <SearchBar className='searchbar'/>
        <button className="buttonCreateInNavBar">
        <Link to='/create'>⚡️Create a new pokemon</Link>
        </button>
        <button className="backHome">
          <Link to={`/home`}>Back Home</Link>
        </button>
        
    </div>
  );
}

export default NavBar;