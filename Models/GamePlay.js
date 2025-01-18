module.exports = (sequelize, DataTypes, TableName) => {
    const GamePlay = sequelize.define(TableName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { 
                model: 'Users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE' 
        },
        score: {
            type: DataTypes.BIGINT,
        },
        coins: {
            type: DataTypes.BIGINT,
        },
        gameType: {
            type: DataTypes.STRING,
        },
        gameTime: {
            type: DataTypes.FLOAT,
        },
        gameDificulty:{
            type: DataTypes.STRING
        },
        completlyPlayed: {
            type: DataTypes.BOOLEAN
        },
        gameResult: {
            type: DataTypes.STRING,
        },
        opponentId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { 
                model: 'Users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE' 
        },
        opponentScore:{
            type: DataTypes.BIGINT,
        },
    });
    return GamePlay;
}