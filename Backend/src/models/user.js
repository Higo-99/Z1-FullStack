'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleId: {
      type: DataTypes.STRING,
      defaultValue: 'Customer'
    },

    positionId: DataTypes.STRING,
    image: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

