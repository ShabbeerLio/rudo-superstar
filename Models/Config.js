module.exports = (sequelize, DataTypes, TableName) => {
    const Config = sequelize.define(TableName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: DataTypes.STRING,
        },
        value: {
            type: DataTypes.STRING,
        },
    })
    return Config;
}