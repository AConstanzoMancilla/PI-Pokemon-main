const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const pokemonsRoutes = require("../routes/pokemonsRoutes");
const typesRoutes = require("../routes/typesRoutes");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonsRoutes);
router.use("/types", typesRoutes);


module.exports = router;
