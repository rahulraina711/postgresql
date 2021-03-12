const dbconfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD,{
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorAliases: false,

    pool:{
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model")(sequelize, Sequelize);

db.tutorials.hasMany(db.comments, {as:'comments'});
db.comments.belongsTo(db.tutorials,{
    foreignKey: "tutorialId", as: "tutorial",
});

module.exports = db;