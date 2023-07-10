const { Router } = require("express");
const { getDiets } = require("../controllers/controllerDiets");

const rDiets = Router();

rDiets.get("/", getDiets);

module.exports = rDiets;
