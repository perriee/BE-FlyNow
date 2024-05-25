/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("payments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bookingId: {
                type: Sequelize.BIGINT,
                references: {
                    model: {
                        tableName: "bookings",
                    },
                    key: "id",
                },
            },
            paymentAmount: {
                type: Sequelize.INTEGER,
            },
            paymentMethod: {
                type: Sequelize.STRING,
            },
            paymentStatus: {
                type: Sequelize.ENUM("paid", "pending", "unpaid"),
                defaultValue: "pending",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("payments");
    },
};
