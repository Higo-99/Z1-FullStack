'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductImages extends Model { };
    ProductImages.init({
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        position: DataTypes.STRING,
        data: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'ProductImages',
    });
    return ProductImages;
};

