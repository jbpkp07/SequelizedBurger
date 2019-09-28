"use strict";

const Sequelize = require("sequelize");

function defineBurgerIngredients(sequelize) {

    class BurgerIngredients extends Sequelize.Model {}

    const attributes = {

        fk_burger_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        fk_ingredient_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
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
        modelName: "Burger_Ingredients",
        timestamps: false
    };

    BurgerIngredients.init(attributes, options);

    BurgerIngredients.associate = (models) => {

        const associateOptions1 = {
            foreignKey: "fk_burger_id"
            // onDelete: "cascade",
            // onUpdate: "cascade"
        };

        BurgerIngredients.belongsTo(models.Burgers, associateOptions1);

        const associateOptions2 = {
            foreignKey: "fk_ingredient_id"
            // onDelete: "cascade",
            // onUpdate: "cascade"
        };

        BurgerIngredients.belongsTo(models.Ingredients, associateOptions2);
    };

    return BurgerIngredients;
}


module.exports = defineBurgerIngredients;