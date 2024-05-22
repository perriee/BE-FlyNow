'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookingCode: {
        type: Sequelize.STRING
      },
      flightId: {
        type: Sequelize.BIGINT
      },
      userId: {
        type: Sequelize.BIGINT
      },
      numAdults: {
        type: Sequelize.INTEGER
      },
      numChildre: {
        type: Sequelize.INTEGER
      },
      numBabies: {
        type: Sequelize.INTEGER
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};