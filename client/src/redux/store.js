import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //thunk es un middleware que nos ayuda a trabajar con asincronías. por sí solo redux NO sabe trabajar con asincronías
import rootReducer from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//sirve para conectar con la extensión de chrome, redux devtools

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))//sirve para hacer peticiones al server
);

export default store;