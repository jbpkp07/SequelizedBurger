"use strict";

require("dotenv").config();

module.exports =
{
    "development": {
        "username": process.env.BURGERS_DB_USER || "root",
        "password": process.env.BURGERS_DB_PASS || "",
        "database": "burgers_db",
        "host": "localhost",
        "dialect": "mysql",
        "logging": false
    },
    "test": {
        "username": process.env.BURGERS_DB_USER || "root",
        "password": process.env.BURGERS_DB_PASS || "",
        "database": "burgers_db",
        "host": "localhost",
        "dialect": "mysql",
        "logging": false
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql",
        "logging": false
    }
};