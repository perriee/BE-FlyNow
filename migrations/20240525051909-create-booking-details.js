/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("booking_details", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bookingId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "bookings",
                    },
                    key: "id",
                },
            },
            passengerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "passengers",
                    },
                    key: "id",
                },
            },
            seatId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "seats",
                    },
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
    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("booking_details");
    },
};
