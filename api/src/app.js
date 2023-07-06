const express = require('express'); //nos traemos a la librería express
const cookieParser = require('cookie-parser'); //middleware
const bodyParser = require('body-parser'); //middleware
const morgan = require('morgan'); //middleware
const routes = require('./routes/index.js'); 

require('./db.js');

const server = express(); //estamos creando el server

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => { //access control allow origin es una configuración para que los headers no se dupliquen 
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); //acá estamos indicando que cuando se escriba una ruta vamos a utilizar a routes para tener todo modularizado

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server; //exportamos al server para poder importarlo en el archivo index