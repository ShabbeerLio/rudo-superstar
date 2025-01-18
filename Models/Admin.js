module.exports = (sequelize, DataTypes, TableName) => {
    const Admin = sequelize.define(TableName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        active:{
            type:DataTypes.BOOLEAN
        }
    })
    return Admin;
}