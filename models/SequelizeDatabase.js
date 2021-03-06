"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const configPaths = require("../config/configPaths.js");
const config = require(configPaths.configConnectionDetailsPath);


class SequelizeDatabase {

    constructor() {
        
        this.thisFileName = path.basename(configPaths.sequelizeDatabasePath);

        this.env = process.env.NODE_ENV || "development";

        this.config = config[this.env];

        this.connection = null;

        this.database = {};

        this.seedPromiseFunc = null;

        this.assignConnection();

        this.gatherModels();

        this.buildAssociations();

        this.finalizeDatabase();
    }

    assignConnection() {

        const productionEnv = this.config.use_env_variable;

        if (productionEnv) {

            this.connection = new Sequelize(process.env[productionEnv], this.config);
        }
        else {
        
            this.connection = new Sequelize(this.config.database, this.config.username, this.config.password, this.config);
        }
    }

    gatherModels() {

        fs.readdirSync(__dirname)

          .filter(file => this.isValidModelFile(file))

          .forEach(file => {
      
            const model = this.connection.import(path.join(__dirname, file));
      
            this.database[model.name] = model;
        });
    }

    isValidModelFile(file) {

        if (file.indexOf(".") === 0) {
    
            return false;
        }
    
        if (file === this.thisFileName) {
    
            return false;
        }
    
        if (file.slice(-3) !== ".js") {
    
            return false;
        }
    
        return true;
    }

    buildAssociations() {

        Object.keys(this.database).forEach(modelName => {
        
            if (this.database[modelName].associate) {
      
                this.database[modelName].associate(this.database);
            }
        });
    }

    finalizeDatabase() {

        this.database.connection = this.connection;

        this.database.Sequelize = Sequelize;
    }

    registerSeedPromiseFunc(seedPromiseFunc) {

        this.seedPromiseFunc = seedPromiseFunc;
    }

    connect() {

        if (process.env.BURGERS_DB_FORCE_SYNC_AND_SEED === "true") {

            if (typeof this.seedPromiseFunc === "function") {

                const promise = this.seedPromiseFunc();

                return promise;
            }
        }

        const promise = this.database.connection.sync();  //IF NOT EXIST ADD TABLE's (no forced overwriting, no data seeding)

        return promise;
    }
}


module.exports = SequelizeDatabase;