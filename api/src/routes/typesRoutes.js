const { Router } = require("express");

const { getAllTypesHandler } = require("../handlers/typesHandlers")

const typesRoutes = Router();


typesRoutes.get("/", getAllTypesHandler);


module.exports = typesRoutes;