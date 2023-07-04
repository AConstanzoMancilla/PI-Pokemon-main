import './filters.styles.css';
import { getTypes, filterType, filterOrder, filterOrigin } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Filters() {
    const dispatch = useDispatch();

    const types = useSelector((state) => state.types)
    console.log('types',types);
    useEffect(() => {
        dispatch(getTypes())
    }, []);

    const handlerTypes = (event) => {
        console.log(event.target.value)
        dispatch(filterType(event.target.value))
    }

    const handlerOrder = (event) => {
        console.log('handlerOrder',event.target.value);
        dispatch(filterOrder(event.target.value))
    }
    
    const handlerOrigin = (event) => {
        dispatch(filterOrigin(event.target.value))
    }

  return (
    <div className='filtercontainer'>
        <select className="buttonFilters" onChange={handlerTypes}>
            <option value="default">Choose a pokemon type</option>
            {types.map((type, index) => (
              
                <option key={index} value={type.name}>{type.name}</option>
            ))}
        </select>

        <select className="buttonFilters" id="order" onChange={handlerOrder}>
            <option value="default">Choose order</option>
            <option value="Ascendant">Ascendant</option>
            <option value="Descendent">Descendent</option>
            <option value="High Attack">High Attack</option>
            <option value="Low Attack">Low Attack</option>

        </select>

        <select className="buttonFilters" id="origin" onChange={handlerOrigin}>
            <option value="default">Choose origin</option>
            <option value="api">Pokemon from API</option>
            <option value="db">Pokemon from DB</option>
        </select>
    </div>
  );
}

export default Filters;