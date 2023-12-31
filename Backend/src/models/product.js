'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model { };
    Products.init({
        label: DataTypes.STRING,
        code: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        prevPrice: DataTypes.INTEGER,
        type: DataTypes.STRING,
        volume: DataTypes.STRING,
        fragrance: DataTypes.STRING,
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};

