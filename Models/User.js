module.exports = (sequelize, DataTypes,TableName) => {
    const User = sequelize.define(TableName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        emailId:{
            type:DataTypes.STRING,
        },
        googleId:{
            type:DataTypes.STRING,
        },
        googleImageUrl: {
            type: DataTypes.TEXT
        },
        gender:{
            type:DataTypes.STRING,
        },
        age:{
            type:DataTypes.INTEGER,
        },
        country:{
            type:DataTypes.STRING,
        },
        state:{
            type:DataTypes.STRING,
        },
        city:{
            type:DataTypes.STRING,
        },
        mobileNo:{
            type:DataTypes.STRING,
        },
        totalScore:{
            type:DataTypes.BIGINT,
        },
        totalCoins:{
            type:DataTypes.BIGINT,
        },
        totalFriends:{
            type:DataTypes.INTEGER,
        },
        totalMatch:{
            type:DataTypes.INTEGER,
        },
        totalWin:{
            type:DataTypes.INTEGER,
        },
        totalLose:{
            type:DataTypes.INTEGER,
        },
        totalDraw:{
            type:DataTypes.INTEGER,
        },
        active: {
            type: DataTypes.BOOLEAN
        }
    })
    return User;
}