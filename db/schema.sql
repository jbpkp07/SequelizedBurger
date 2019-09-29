        DROP DATABASE IF EXISTS burgers_db;

        CREATE DATABASE burgers_db;

        USE burgers_db;

        CREATE TABLE burgers (
            id         INT NOT NULL AUTO_INCREMENT,
            name       VARCHAR(255) NOT NULL,
            devoured   BOOLEAN NOT NULL DEFAULT FALSE,
            createdAt  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
        );

        CREATE TABLE ingredients (
            id         INT NOT NULL AUTO_INCREMENT,
            name       VARCHAR(255) NOT NULL,
            createdAt  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
        );

        CREATE TABLE burger_ingredients (
            id               INT NOT NULL AUTO_INCREMENT,
            fk_burger_id     INT NOT NULL,
            fk_ingredient_id INT NOT NULL,
            createdAt        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            CONSTRAINT fk_burger_id     FOREIGN KEY (fk_burger_id)     REFERENCES burgers(id)     ON UPDATE CASCADE ON DELETE CASCADE,
            CONSTRAINT fk_ingredient_id FOREIGN KEY (fk_ingredient_id) REFERENCES ingredients(id) ON UPDATE CASCADE ON DELETE CASCADE
        );