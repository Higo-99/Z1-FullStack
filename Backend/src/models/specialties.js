'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Spectialties extends Model { };
    Spectialties.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Spectialties',
    });
    return Spectialties;
};