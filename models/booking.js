"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init(
    {
      bookingCode: DataTypes.STRING,
      flightId: DataTypes.BIGINT,
      userId: DataTypes.BIGINT,
      numAdults: DataTypes.INTEGER,
      numChildre: DataTypes.INTEGER,
      numBabies: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "booking",
      paranoid: true,
      timestamps: true,
    }
  );
  return booking;
};
