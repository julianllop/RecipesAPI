const { Router } = require("express");
const {
    getRecipes,
    getRecipesId,
    createRecipe,
} = require("../controllers/controllerRecipes");

const rRecipes = Router();

rRecipes.get("/", getRecipes);

rRecipes.get("/:id", getRecipesId);

rRecipes.post("/", createRecipe);

module.exports = rRecipes;
