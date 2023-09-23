'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model { };
    Product.init({
        product: DataTypes.STRING,
        price: DataTypes.STRING,
        type: DataTypes.STRING,
        product_image: DataTypes.STRING,
        fragrance: DataTypes.STRING,
        style: DataTypes.STRING,

        phoneNumber: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        roleId: {
            type: DataTypes.STRING,
            defaultValue: 'Customer'
        },

        positionId: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};

