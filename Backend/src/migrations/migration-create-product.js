'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            images: {
                type: Sequelize.ARRAY(Sequelize.TEXT)
            },
            label: {
                type: Sequelize.STRING
            },
            code: {
                type: Sequelize.STRING,
                unique: true
            },
            stock: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.INTEGER
            },
            prevPrice: {
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING
            },
            volume: {
                type: Sequelize.STRING
            },
            fragrance: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            description: {
                type: Sequelize.TEXT
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    }
};