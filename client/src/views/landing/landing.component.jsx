import './landing.styles.css';
import { Link } from 'react-router-dom';


function Landing() {
  return (
    <div>
      <h1>Welcome to pokemons page</h1>
      <button>
        <Link to='/home'>HOME</Link>
      </button>
    </div>
  );
}

export default Landing;