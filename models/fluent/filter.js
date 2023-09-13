'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Filter extends Model {}

    Filter.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        details: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                return JSON.parse(this.getDataValue('details'));
            },
            set(value) {
                this.setDataValue('details', JSON.stringify(value))
            }
        },
        ids: {
            type: DataTypes.VIRTUAL,
            allowNull: true,
            get() {
                let details = JSON.parse(this.getDataValue('details'));
                return details.ids.split(",");
            }
        }
    }, {
        sequelize,
        tableName: 'filters',
        timestamps: false,
        modelName: 'Filter'
    });

    return Filter;

}