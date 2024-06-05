/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("bookings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bookingCode: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            departureFlightId: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: {
                        tableName: "flights",
                    },
                    key: "id",
                },
            },
            returnFlightId: {
                allowNull: true,
                type: Sequelize.BIGINT,
                references: {
                    model: {
                        tableName: "flights",
                    },
                    key: "id",
                },
            },
            userId: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: { tableName: "users" },
                    key: "id",
                },
            },
            numAdults: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            numChildren: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            numBabies: {
                allowNull: false,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("bookings");
    },
};
