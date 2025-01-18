const dbConfig = require('../Config/DbConfig.js')
const { Sequelize, DataTypes } = require('sequelize')

var sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: false,
    logging: true,
    pool: {
        max: dbConfig.POOL.MAX,
        min: dbConfig.POOL.MIN,
        acquire: dbConfig.POOL.ACQUIRE,
        idle: dbConfig.POOL.IDLE
    }
}
);

sequelize.authenticate().then(() => {
    console.log("Connected to database " + dbConfig.DB);
}).catch((err) => {
    console.log(err);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//Game API Config
db.User = require('./User.js')(sequelize, DataTypes, "User")
db.GamePlay = require('./GamePlay.js')(sequelize, DataTypes, "GamePlay")
db.Config = require('./Config.js')(sequelize, DataTypes, "Config")

//Web API Config
db.Admin=require('./Admin.js')(sequelize,DataTypes,"Admin")



db.GamePlay.belongsTo(db.User, { as: 'Player', foreignKey: 'playerId' });
db.GamePlay.belongsTo(db.User, { as: 'Opponent', foreignKey: 'opponentId' });
db.User.hasMany(db.GamePlay, { as: 'PlayerGames', foreignKey: 'playerId' });
db.User.hasMany(db.GamePlay, { as: 'OpponentGames', foreignKey: 'opponentId' });

db.sequelize.sync({
    force: false
}).then(() => {
    console.log("Sync has been completed");
}).catch((err) => {
    console.log("Some Issue In Sync " + err);
});

module.exports = db;