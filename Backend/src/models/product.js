'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model { };
    Product.init({
        label: DataTypes.STRING,
        code: DataTypes.STRING,
        price: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
        type: DataTypes.STRING,
        fragrance: DataTypes.ARRAY(DataTypes.STRING),
        style: DataTypes.ARRAY(DataTypes.STRING),

        product_image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};

