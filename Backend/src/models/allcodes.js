'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcodes extends Model { };
    Allcodes.init({
        key: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcodes',
    });
    return Allcodes;
};