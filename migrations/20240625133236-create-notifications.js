"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("notifications", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            flightId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "flights",
                    key: "id",
                },
            },
            paymentId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "payments",
                    key: "id",
                },
            },
            message: {
                type: Sequelize.TEXT,
            },
            type: {
                type: Sequelize.STRING,
            },
            isRead: {
                type: Sequelize.BOOLEAN,
            },
            deletedAt: {
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
        await queryInterface.dropTable("notifications");
    },
};
