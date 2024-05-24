"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class airport extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            airport.hasMany(models.flight, {
                foreignKey: "departureAirportId",
            });
            airport.hasMany(models.flight, {
                foreignKey: "arrivalAirportId",
            });
        }
    }
    airport.init(
        {
            airportCode: DataTypes.STRING,
            airportName: DataTypes.STRING,
            city: DataTypes.STRING,
            country: DataTypes.STRING,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "airport",
            paranoid: true,
        }
    );
    return airport;
};
