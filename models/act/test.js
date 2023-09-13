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
            allowNull: true,
            get() {
                return JSON.parse(this.getDataValue('targets'));
            },
            set(value) {
                this.setDataValue('targets', JSON.stringify(value))
            }
        },
        primes: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                return JSON.parse(this.getDataValue('primes'));
            },
            set(value) {
                this.setDataValue('primes', JSON.stringify(value))
            }
        },
        config: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                return JSON.parse(this.getDataValue('config'));
            },
            set(value) {
                this.setDataValue('config', JSON.stringify(value))
            }
        }
    }, {
        sequelize,
        tableName: 'tests',
        timestamps: false,
        modelName: 'Test'
    });

    return Test;

}