'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model { };
    Products.init({
        images: DataTypes.ARRAY(DataTypes.TEXT),
        label: DataTypes.STRING,
        code: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        prevPrice: DataTypes.INTEGER,
        type: DataTypes.STRING,
        volume: DataTypes.STRING,
        fragrance: DataTypes.ARRAY(DataTypes.STRING),
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};

