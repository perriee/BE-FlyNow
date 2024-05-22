"use strict";
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
      flightId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      userId: {
        allowNull: false,
        type: Sequelize.BIGINT,
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
