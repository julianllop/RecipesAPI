const axios = require("axios");
const { Recipe, Diet } = require("../db");
require("dotenv").config();
const { URL } = process.env;
const { v4: uuidv4 } = require("uuid");
const { API_KEY } = process.env;

// GET ALL API-----------------------------------------------------

const apiInfo = async () => {
    try {
        const apiInfo = await axios.get(`${URL}?api_key=${API_KEY}`);
        const data = apiInfo.data.results;
        const filteredApiInfo = Promise.all(
            data.map((recipe) => {
                const summary = recipe.summary
                    .replace(/<\/?a[^>]*>/g, "")
                    .replace(/<\/?b[^>]*>/g, "");

                const stepByStep =
                    recipe.analyzedInstructions[0] &&
                    recipe.analyzedInstructions[0].steps
                        ? recipe.analyzedInstructions[0].steps.map(
                              (e) => e.step
                          )
                        : "";

                return {
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    diet: recipe.diets,
                    summary: summary,
                    healthScore: recipe.healthScore,
                    analyzedInstructions: stepByStep,
                    createdInDb: false,
                };
            })
        );

        return filteredApiInfo;
    } catch (error) {
        console.log("Ocurrio un error: ", error);
    }
};

// GET ALL DB-----------------------------------------------------

const dbInfo = async () => {
    const recipesDb = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
    return recipesDb;
};

// GET ALL-----------------------------------------------------

const getAllRecipes = async () => {
    const apiRecipes = await apiInfo();
    const dbRecipes = await dbInfo();
    return [...apiRecipes, ...dbRecipes];
};

//Add Dogs-----------------------------------------------------

const addRecipe = async (
    title,
    image,
    diet,
    summary,
    healthScore,
    analyzedInstructions
) => {
    let id = uuidv4();
    return await Recipe.create({
        id,
        title,
        image,
        diet,
        summary,
        healthScore,
        analyzedInstructions,
        createdInDb: true,
    });
};

module.exports = {
    apiInfo,
    getAllRecipes,
    addRecipe,
};
