'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bookings extends Model { };
    Bookings.init({
        statusId: DataTypes.STRING, // key in allCode model
        doctorId: DataTypes.INTEGER, // id in user model
        patientId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Bookings',
    });
    return Bookings;
};