"use strict";

const Sequelize = require("sequelize");

function defineBurgers(sequelize) {

    class Burgers extends Sequelize.Model {}

    const attributes = {

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        devoured: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: {
            type: "TIMESTAMP",
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
    };

    const options = {
        sequelize,
        modelName: "Burgers",
        timestamps: false
    };

    Burgers.init(attributes, options);

    Burgers.associate = (models) => {

        const associateOptions = {
            foreignKey: "fk_burger_id",
            onDelete: "cascade",
            onUpdate: "cascade"
        };

        Burgers.hasMany(models.Burger_Ingredients, associateOptions);
    };

    return Burgers;
}


module.exports = defineBurgers;