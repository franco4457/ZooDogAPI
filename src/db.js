require("dotenv").config();
const { Sequelize } = require("sequelize");
const dogModel = require("./models/Dog.js");
const tempModel = require("./models/Temperament.js");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

const DB = DB_DEPLOY || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`;
const sequelize = new Sequelize(DB, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

dogModel(sequelize);
tempModel(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Dog.belongsToMany(Temperament, { through: "dogTemperament" });
Temperament.belongsToMany(Dog, { through: "dogTemperament" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
