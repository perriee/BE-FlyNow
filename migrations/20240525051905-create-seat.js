/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("seats", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            seatCode: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            seatAvailable: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            flightId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: { tableName: "flights" },
                    key: "id",
                },
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
        await queryInterface.dropTable("seats");
    },
};
