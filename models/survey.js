'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Survey extends Model {}

    Survey.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'surveys',
        timestamps: false,
        modelName: 'Survey'
    });

    return Survey;

}