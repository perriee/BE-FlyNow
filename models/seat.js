"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class seat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            seat.hasOne(models.passenger, { foreignKey: "seatId" });
            seat.belongsTo(models.flight, { foreignKey: "flightId" });
        }
    }
    seat.init(
        {
            seatCode: DataTypes.STRING,
            seatAvailable: DataTypes.BOOLEAN,
            seatType: DataTypes.ENUM("economy", "business", "first_class"),
            flightId: DataTypes.INTEGER,
            price: DataTypes.BIGINT,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "seat",
            paranoid: true,
        }
    );
    return seat;
};
