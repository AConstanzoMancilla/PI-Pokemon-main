import './create.styles.css';
import axios from "axios";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../../redux/actions';
import NavBar from '../../components/navBar/navBar.component';

function Create() {

  const dispatch = useDispatch();

  const types = useSelector((state) => state.types)

  useEffect(() => {
    dispatch(getTypes())
   
  }, []);
  console.log(types);

  const [form, setForm] = useState({ 
    id: "",
    name: "", 
    image: "", 
    hp: "", 
    attack: "", 
    defense: "", 
    speed: "", 
    height: "", 
    weight: "",
    type1: "",
    type2: ""
  })

  const [errors, setErrors] = useState({ 
    id: "",
    name: "", 
    image: "", 
    hp: "", 
    attack: "", 
    defense: "", 
    speed: "", 
    height: "", 
    weight: "",
    type1: "",
    type2: "",
    error: ""
  })

  const handlerChange = (event) => {
    setForm({
      ...form, 
      [event.target.name] : event.target.value
    })
    validate()
  }


  const validate = () => {
    //id
    if(/^[a-zA-Z]+$/.test(form.id)){
      setErrors({
        ...errors,
        id: "Id must be only numbers"
      })
    }
    else setErrors({...errors, id: ""})
    //name
    if(/^[a-zA-Z]+$/.test(form.name)){
      setErrors({
        ...errors,
        name: "Name must be only letters"
      })
    }
    else setErrors({...errors, name: ""})
    //image
    if(/^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|gif|png)$/.test(form.image)){
      setErrors({
        ...errors,
        image: "Invalid url, try another one "
      })
    }
    else setErrors({...errors, image: ""})
    //hp
    if(form.hp.length > 100){
      setErrors({
        ...errors,
        hp: "Hp must be less than 100"
      })
    }
    else setErrors({...errors, hp: ""})
    //attack
    if(form.attack.length > 80){
      setErrors({
        ...errors,
        attack: "Attack must be less than 80"
      })
    }
    else setErrors({...errors, attack: ""})
    //defense
    if(form.defense.length > 80){
      setErrors({
        ...errors,
        defense: "Defense must be less than 80"
      })
    }
    else setErrors({...errors, defense: ""})
    //speed
    if(form.speed.length > 200){
      setErrors({
        ...errors,
        speed: "Speed must be less than 200"
      })
    }
    else setErrors({...errors, speed: ""})
    //height
    if(form.height.length > 200){
      setErrors({
        ...errors,
        height: "Height must be less than 200"
      })
    }
    else setErrors({...errors, height: ""})
    //weight
    if(form.weight.length > 150){
      setErrors({
        ...errors,
        weight: "Weight must be less than 150"
      })
    }
    else setErrors({...errors, weight: ""})
  }

  const handlerSubmit =  async (event) => {
    event.preventDefault();
    try {
      const send = await axios.post("http://localhost:3001/pokemons", form)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <NavBar/>
      <div>
        <h1 className="title">Create your pokemon</h1>
      </div>
      <form className="form-container" onSubmit={handlerSubmit}>
      <div className="inputs">
          <label>Id:</label>
          <input className="id" name="id" type="number" placeholder="Create an id" value={form.id} onChange={handlerChange}></input>
          {errors.id && <p>{errors.id}</p>}
        </div>
        <hr/>
        <div>
          <label>Name:</label>
          <input className="name" name="name" type="text" placeholder="Create a name" value={form.name} onChange={handlerChange}></input>
          {errors.name && <p>{errors.name}</p>}
        </div>
        <hr/>
        <div>
          <label>Image:</label>
          <input name="image" type="text" placeholder="Pokemon image url" value={form.image} onChange={handlerChange}></input>
          {errors.image && <p>{errors.image}</p>}
        </div>
        <hr/>
        <div>
          <label>Hp</label>
          <input className="hp" name="hp" type="number" placeholder="Pokemon lives" value={form.hp} onChange={handlerChange}></input>
          {errors.hp && <p>{errors.hp}</p>}
        </div>
        <hr/>
        <div>
          <label>Attack</label>
          <input className="attack" name="attack" type="number" placeholder="Pokemon attack" value={form.attack} onChange={handlerChange}></input>
          {errors.attack && <p>{errors.attack}</p>}
        </div>
        <hr/>
        <div>
          <label>Defense</label>
          <input className="defense" name="defense" type="number" placeholder="Pokemon defense" value={form.defense} onChange={handlerChange}></input>
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <hr/>
        <div>
          <label>Speed:</label>
          <input className="speed" name="speed"  type="number" placeholder="Pokemon speed" value={form.speed} onChange={handlerChange}></input>
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <hr/>
        <div>
          <label>Height</label>
          <input  className="height" name="height" type="number" placeholder="Pokemon height" value={form.height} onChange={handlerChange}></input>
          {errors.height && <p>{errors.height}</p>}
        </div>
        <hr/>
        <div>
          <label>Weight</label>
          <input className="weight" name="weight" type="number" placeholder="Pokemon weight" value={form.weight} onChange={handlerChange}></input>
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <hr/>
        <div>
          <label>Type 1</label>
          <select name="type1" placeholder="Pokemon type 1" value={form.type1} onChange={handlerChange}>
            <option value="">Select type 1</option>
            {types.map((type, index) =>(
            <option key={index} value={type.name}>
              {type.name}
            </option>
            ))}
          </select>
        </div>
        <hr/>
        <div>
          <label>Type 2</label>
          <select name="type2" placeholder="Pokemon type 2" value={form.type2} onChange={handlerChange}>
            <option value="">Select type 2</option>
            {types.map((type, index) => (
            <option key={index} value={type.name}>
              {type.name}
            </option>
            ))}
          </select>
          {errors.type2 && <p>{errors.type2}</p>}
        </div>
        <hr/>
        <button disabled={!form.name || !form.image || !form.hp || !form.attack || !form.defense || !form.speed || !form.height || !form.weight || !form.type1 || !form.type2 || errors.name || errors.image || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.type1 || errors.type2 }>Create</button>
      </form>
      
    </div>
  );
}

export default Create;