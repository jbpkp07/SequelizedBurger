"use strict";


const burgers =
[
    { name: "Cheese Burger" },
    { name: "Bacon Cheese Burger" },
    { name: "Bacon Avocado Burger" }
];

const ingredients = 
[
    { name: "Cheese" },
    { name: "Bacon" },
    { name: "Avocado" },
    { name: "Lettuce" },
    { name: "Tomato" },
    { name: "Onion" },
    { name: "Mayo" },
    { name: "Ketchup" },
    { name: "Mustard" }
];

const burger_ingredients =
[
    { fk_burger_id: 1, fk_ingredient_id: 1 },
    { fk_burger_id: 2, fk_ingredient_id: 1 },
    { fk_burger_id: 2, fk_ingredient_id: 2 },
    { fk_burger_id: 3, fk_ingredient_id: 2 },
    { fk_burger_id: 3, fk_ingredient_id: 3 },
];


module.exports = 
{
    burgers,
    ingredients,
    burger_ingredients
};