'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Record extends Model {}

    Record.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        responses: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                return JSON.parse(this.getDataValue('responses'));
            },
            set(value) {
                this.setDataValue('responses', JSON.stringify(value))
            }
        },
        info: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                return JSON.parse(this.getDataValue('info'));
            },
            set(value) {
                this.setDataValue('info', JSON.stringify(value))
            }
        },
        participant_id: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'records',
        timestamps: false,
        modelName: 'Record'
    });

    return Record;

}