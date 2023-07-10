const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const rRecipes = require("./recipesRouter");
const rDiets = require("./dietsRouter");

const mainRouter = Router();

mainRouter.use("/recipes", rRecipes);
mainRouter.use("/diets", rDiets);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = mainRouter;
