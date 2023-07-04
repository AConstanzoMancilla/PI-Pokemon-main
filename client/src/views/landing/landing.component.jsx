import './landing.styles.css';
import { Link } from 'react-router-dom';


function Landing() {
  return (
    <div className="landing">
      <div className="title" >
        <hr/>
        <h1 >Welcome to pokemons page</h1>
      </div>
      <button className="buttonLanding">
        <Link to='/home'>HOME</Link>
      </button>
      
    </div>
  );
}

export default Landing;