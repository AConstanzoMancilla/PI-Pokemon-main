import './landing.styles.css';
import { Link } from 'react-router-dom';


function Landing() {
  return (
    <div className="landing">
      <div className="title">
        <h1>Welcome to pokemons page</h1>
      </div>



      
      <button className="botón">
        <Link to='/home'>HOME</Link>
      </button>
   
    </div>
  );
}

export default Landing;