const { Recipe, Diet } = require("../db");
const { getAllRecipes, addRecipe } = require("./functions");

// ************************** GET ALL RECIPES - AND NAME **************************

const getRecipes = async (req, res) => {
    const { title } = req.query;
    try {
        const allRecipes = await getAllRecipes();
        if (title) {
            const byName = allRecipes.filter((recipe) =>
                recipe.title.toLowerCase().includes(title.toLocaleLowerCase())
            );
            byName.length
                ? res.status(200).send(byName)
                : res.status(404).send("No hay recetas con ese nombre");
        } else {
            res.status(200).send(allRecipes);
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// ************************** GET RECIPE ID **************************

const getRecipesId = async (req, res) => {
    const { id } = req.params;
    const allRecipes = await getAllRecipes();

    if (isNaN(id)) {
        try {
            let dbId = await Recipe.findByPk(id, { include: Diet }); // entonces la busco directo de la base de datos
            res.status(200).json(dbId);
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            if (id) {
                let recipesId = allRecipes.filter(
                    (recipe) => recipe.id === parseInt(id)
                );
                recipesId.length
                    ? res.status(200).json(recipesId[0])
                    : res.status(400).send("Not found");
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    }
};

// ***************************** ADD RECIPE *****************************

const createRecipe = async (req, res) => {
    const { title, image, diet, summary, healthScore, analyzedInstructions } =
        req.body;

    try {
        const newRecipe = await addRecipe(
            title,
            image,
            diet,
            summary,
            healthScore,
            analyzedInstructions
        );
        res.status(201).json(newRecipe);
    } catch (error) {
        console.log("Paso algo", error);
    }
};

module.exports = { getRecipes, getRecipesId, createRecipe };
