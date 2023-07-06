import './create.styles.css';

import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTypes } from '../../redux/actions';
import NavBar from '../../components/navBar/navBar.component';

function Create() {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const types = useSelector((state) => state.types)//estamos atentos a la propiedad types del global state

  useEffect(() => {
    dispatch(getTypes())
  }, []);
  

  const [form, setForm] = useState({ //estado local del form
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

  const [errors, setErrors] = useState({ //estado local de los errors
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
  }

  useEffect(() => {
    validate()
  }, [form]);

  const validate = () => {
    //id
    if(!/^[0-9]+$/.test(form.id) && form.id != ""){
      errors.id = "Id must be a number"
      setErrors(errors)
    }
    else {
      errors.id =""
      setErrors(errors)
    }
    //name
    if(!/^[a-zA-Z]+$/.test(form.name) && form.name != ""){
      errors.name =  "Name must be only letters"
      setErrors(errors)
    }
    else {
      errors.name =""
      setErrors(errors)
    }
    //image
    if(!/^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|gif|png)$/.test(form.image) && form.image != ""){
      errors.image = "Invalid url, try another one"
      setErrors(errors)
    }
    else {
      errors.image =""
      setErrors(errors)
    }
    //hp
    if(!/^[0-9]+$/.test(form.hp)  && form.hp != ""){
      errors.hp = "Hp must be a number"
      setErrors(errors)
    }
    else {
      errors.hp =""
      setErrors(errors)
    }
    //attack
    if(!/^[0-9]+$/.test(form.attack) && form.attack != ""){
      errors.attack= "Attack must be a number"
      setErrors(errors)
    }
    else {
      errors.attack =""
      setErrors(errors)
    }
    //defense
    if(!/^[0-9]+$/.test(form.defense) && form.defense != ""){
      errors.defense = "Defense must be a number"
      setErrors(errors)
    }
    else {
      errors.defense =""
      setErrors(errors)
    }
    //speed
    if(!/^[0-9]+$/.test(form.speed) && form.speed != ""){
      errors.speed = "Speed must be a number"
      setErrors(errors)
    }
    else {
      errors.speed =""
      setErrors(errors)
    }
    //height
    if(!/^[0-9]+$/.test(form.height) && form.height != ""){
      errors.height = "Height must be a number"
      setErrors(errors)
    }
    else {
      errors.height =""
      setErrors(errors)
    }
    //weight
    if(!/^[0-9]+$/.test(form.weight) && form.weight != ""){
      errors.weight = "Weight must be a number"
      setErrors(errors)
    }
    else {
      errors.weight =""
      setErrors(errors)
    }
  }

  const handlerSubmit =  async (event) => {
    event.preventDefault();
    let pokemonCreated = false;

    try {
      const send = await axios.post("http://localhost:3001/pokemons", form)
      pokemonCreated = true;
    } catch (error) {
      alert(("This pokemon ID was already created, change the ID "))
      // console.log(error.message);
    }

    if(pokemonCreated) {
        setForm({ 
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
        var confirmation = window.confirm("Your new pokemon has been created, do you want to see your new pokemon?");

        if (confirmation) {
          // Aquí puedes llamar a la función que deseas ejecutar
          navigate("/home");
        }
      }
    }

  return (
    <div className="containerForm">
      <NavBar/>
      <form className="form-container" onSubmit={handlerSubmit}>
      <div className="inputs">
        <h1>Complete the form</h1>
        <div>
          <label>Id:</label>
          <input className="id" name="id" placeholder="Create an id" value={form.id} onChange={handlerChange}></input>
          {errors.id && <p>{errors.id}</p>}
        </div>
        <div>
          <label>Name:</label>
          <input className="name" name="name" placeholder="Create a name" value={form.name} onChange={handlerChange}></input>
          {<p>{errors.name &&  errors.name}</p>}
        </div>
        <div>
          <label>Image:</label>
          <input className="image_form" name="image" type="text" placeholder="Pokemon image url" value={form.image} onChange={handlerChange}></input>
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label>Hp</label>
          <input className="hp" name="hp"  placeholder="Pokemon lives" value={form.hp} onChange={handlerChange}></input>
          {errors.hp && <p>{errors.hp}</p>}
        </div>
        <div>
          <label>Attack</label>
          <input className="attack" name="attack" placeholder="Pokemon attack" value={form.attack} onChange={handlerChange}></input>
          {errors.attack && <p>{errors.attack}</p>}
        </div>
        <div>
          <label>Defense</label>
          <input className="defense" name="defense" placeholder="Pokemon defense" value={form.defense} onChange={handlerChange}></input>
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <div>
          <label>Speed:</label>
          <input className="speed" name="speed" placeholder="Pokemon speed" value={form.speed} onChange={handlerChange}></input>
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div>
          <label>Height</label>
          <input  className="height" name="height" placeholder="Pokemon height" value={form.height} onChange={handlerChange}></input>
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          <label>Weight</label>
          <input className="weight" name="weight" placeholder="Pokemon weight" value={form.weight} onChange={handlerChange}></input>
          {errors.weight && <p>{errors.weight}</p>}
        </div>
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
        
        <button disabled={ !form.id || !form.name || !form.image || !form.hp || !form.attack || !form.defense || !form.speed || !form.height || !form.weight || !form.type1 || errors.id || errors.image || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.type1 }>Create</button>
        </div>
      </form>
      </div>
    
  );
}
// 

export default Create;