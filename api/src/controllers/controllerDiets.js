const { Recipe, Diet } = require("../db.js");
const { getAllRecipes } = require("./functions.js");
const { Op } = require("sequelize");

//*************************************************************************************//
const loadDiets = async () => {
	try {
		let allRecipes = await getAllRecipes();
		allRecipes.map((recipe) => {
			recipe.diet?.map((diets) => {
				Diet.findOrCreate({
					where: { name: diets },
				});
			});
		});
	} catch (error) {
		console.log(error);
	}
};

//*************************************************************************************//
const getDiets = async (req, res) => {
	try {
		await loadDiets();
		let diets = await Diet.findAll({});
		res.status(200).json(diets);
	} catch (err) {
		console.log(err);
	}
};
//*************************************************************************************//

module.exports = { loadDiets, getDiets };
