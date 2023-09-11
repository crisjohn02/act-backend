'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Test extends Model {}

    Test.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        targets: {
            type: DataTypes.JSON,
            allowNull: true
        },
        primes: {
            type: DataTypes.JSON,
            allowNull: true
        },
        config: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'tests',
        timestamps: false,
        modelName: 'test'
    });

    return Test;

}