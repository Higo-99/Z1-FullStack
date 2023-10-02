'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model { };
    Products.init({
        image: DataTypes.ARRAY(DataTypes.STRING),
        label: DataTypes.STRING,
        code: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        prevPrice: DataTypes.INTEGER,
        type: DataTypes.STRING,
        fragrance: DataTypes.ARRAY(DataTypes.STRING),
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};

