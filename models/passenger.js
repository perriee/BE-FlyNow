"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class passenger extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            passenger.belongsTo(models.booking, { foreignKey: "bookingId" });
            passenger.belongsTo(models.seat, { foreignKey: "seatId" });
        }
    }
    passenger.init(
        {
            bookingId: DataTypes.INTEGER,
            seatId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            nationality: DataTypes.STRING,
            docType: DataTypes.ENUM("ktp", "pasport", "kartu_keluarga"),
            docNumber: DataTypes.STRING,
            issuingCountry: DataTypes.STRING,
            expiryDate: DataTypes.DATE,
            passengerType: DataTypes.ENUM("adult", "children", "baby"),
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "passenger",
            paranoid: true,
        }
    );
    return passenger;
};
