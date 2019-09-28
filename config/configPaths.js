"use strict";

const path = require("path");


function getFullPath(relativePath) {

    return path.join(__dirname, relativePath);
}

const configPaths =
{
    configConnectionDetailsPath: getFullPath("../config/configConnectionDetails.js"),
    controllerPath:              getFullPath("../controllers/Controller.js"),
    burgersDatabasePath:         getFullPath("../db/BurgersDatabase.js"),
    burgersSeedPath:             getFullPath("../db/seeds.js"),
    sqlSchemaPath:               getFullPath("../db/schema.sql"),
    sqlSeedsPath:                getFullPath("../db/seeds.sql"),
    sequelizeDatabasePath:       getFullPath("../models/SequelizeDatabase.js"),
    publicAssetsPath:            getFullPath("../public/assets"),
    printHeaderFunctionsPath:    getFullPath("../utility/printHeaderFunctions.js")
};


module.exports = configPaths;