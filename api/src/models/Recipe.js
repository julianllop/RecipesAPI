const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"recipe",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			diet: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
			},
			summary: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			healthScore: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			analyzedInstructions: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			createdInDb: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAt: false,
		}
	);
};
