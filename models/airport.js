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
            // define association here
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
