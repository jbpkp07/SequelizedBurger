"use strict";

const configPaths = require("../config/configPaths.js");
const SequelizeDatabase = require(configPaths.sequelizeDatabasePath);
const seeds = require(configPaths.burgersSeedPath);


class BurgersDatabase extends SequelizeDatabase {

    constructor() {

        super();

        this.registerSeedPromiseFunc(this.seedDatabase);
    }

    seedDatabase() {

        return new Promise((resolve, reject) => {

            const options = 
            {
                force: true
            };

            this.database.connection.sync(options).then(() => {  //Overwrite schema and seed data

                const promises = [];

                const burgersPromise = this.database.Burgers.bulkCreate(seeds.burgers);

                promises.push(burgersPromise);

                const ingredientsPromise = this.database.Ingredients.bulkCreate(seeds.ingredients);

                promises.push(ingredientsPromise);

                Promise.all(promises).then(() => {

                    this.database.Burger_Ingredients.bulkCreate(seeds.burger_ingredients).then(() => {

                        resolve();

                    }).catch((error) => {

                        reject(error);
                    });

                }).catch((error) => {

                    reject(error);
                });

            }).catch((error) => {

                reject(error);
            });
        });
    }

    getAllBurgers() {

        return new Promise((resolve, reject) => {

            const options = 
            {
                raw: true,
                include: [this.database.Burgers, this.database.Ingredients],
                order: [["fk_burger_id"], ["fk_ingredient_id"]]
            };

            this.database.Burger_Ingredients.findAll(options).then((BurgerIngredients) => {

                const burgers = [];

                for (const burgerIngredient of BurgerIngredients) {

                    const ingredient = burgerIngredient["Ingredient.name"];

                    const burger = {};

                    burger.id = burgerIngredient["Burger.id"];
                    burger.name = burgerIngredient["Burger.name"];
                    burger.devoured = burgerIngredient["Burger.devoured"];
                    burger.ingredients = [];

                    if (burgers.length === 0 || burgers[burgers.length - 1].id !== burger.id) {

                        burger.ingredients.push(ingredient);

                        burgers.push(burger);
                    }
                    else {

                        burgers[burgers.length - 1].ingredients.push(ingredient);
                    }
                }

                resolve(burgers);

            }).catch((error) => {

                reject(error);
            });
        });
    }

    getAllIngredients() {

        const options = 
        {
            raw: true
        };

        const promise = this.database.Ingredients.findAll(options);

        return promise;
    }

    addNewBurger(name, ingredientIDs) {

        return new Promise((resolve, reject) => {

            const newBurgerObj = 
            {
                name,
                devoured: false
            };

            this.database.Burgers.create(newBurgerObj).then((result) => {

                const newBurgerId = result.dataValues.id;

                const burgerIngredients = [];

                for (const ingredientId of ingredientIDs) {

                    const newBurgerIngredient = 
                    {
                        fk_burger_id: newBurgerId,
                        fk_ingredient_id: ingredientId
                    };

                    burgerIngredients.push(newBurgerIngredient);
                }

                this.database.Burger_Ingredients.bulkCreate(burgerIngredients).then(() => {

                    resolve(result.dataValues);

                }).catch((error) => {

                    reject(error);
                });

            }).catch((error) => {

                reject(error);
            });
        });
    }

    updateBurger(burgerToUpdate) {

        const options = 
        {
            where: { id: burgerToUpdate.id }
        };

        const promise = this.database.Burgers.update(burgerToUpdate, options);

        return promise;
    }

    deleteBurger(id) {

        const options = 
        {
            where: { id }
        };

        const promise = this.database.Burgers.destroy(options);

        return promise;
    }
}


module.exports = BurgersDatabase;