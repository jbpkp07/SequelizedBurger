"use strict";

const Sequelize = require("sequelize");

function defineIngredients(sequelize) {

    class Ingredients extends Sequelize.Model {}

    const attributes = {

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        createdAt: {
            type: "TIMESTAMP",
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
    };

    const options = {
        sequelize,
        modelName: "Ingredients",
        timestamps: false
    };

    Ingredients.init(attributes, options);

    Ingredients.associate = (models) => {

        const associateOptions = {
            foreignKey: "fk_ingredient_id",
            onDelete: "cascade",
            onUpdate: "cascade"
        };

        Ingredients.hasMany(models.Burger_Ingredients, associateOptions);
    };

    return Ingredients;
}


module.exports = defineIngredients;