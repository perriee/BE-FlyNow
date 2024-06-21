"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("payments", "transactionId", {
            type: Sequelize.STRING,
        });

        await queryInterface.addColumn("payments", "snapToken", {
            type: Sequelize.STRING,
        });

        await queryInterface.addColumn("payments", "snapRedirectUrl", {
            type: Sequelize.STRING,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("payments", "transactionId");
        await queryInterface.removeColumn("payments", "snapToken");
        await queryInterface.removeColumn("payments", "snapRedirectUrl");
    },
};
