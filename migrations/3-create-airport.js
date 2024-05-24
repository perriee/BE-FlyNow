"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("airports", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            airportCode: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            airportName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            city: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            country: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("airports");
    },
};
