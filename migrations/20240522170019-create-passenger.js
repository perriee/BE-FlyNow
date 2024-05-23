"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("passengers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bookingId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            seatId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            dateOfBirth: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            nationality: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            docType: {
                allowNull: false,
                type: Sequelize.ENUM("ktp", "paspor", "kartu_keluarga"),
                defaultValue: "ktp",
            },
            docNumber: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            issuingCountry: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            expiryDate: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            passengerType: {
                allowNull: false,
                type: Sequelize.ENUM("adult", "children", "baby"),
                defaultValue: "adult",
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
        await queryInterface.dropTable("passengers");
    },
};
