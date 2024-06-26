/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("flights", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            flightCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            terminal: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            departureAirportId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "airports",
                    key: "id",
                },
            },
            arrivalAirportId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "airports",
                    key: "id",
                },
            },
            airlineId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: "airlines",
                    },
                    key: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
            departureTime: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            arrivalTime: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            flightClass: {
                allowNull: false,
                type: Sequelize.ENUM("economy", "business", "first_class"),
                defaultValue: "economy",
            },
            information: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
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
        await queryInterface.dropTable("flights");
    },
};
