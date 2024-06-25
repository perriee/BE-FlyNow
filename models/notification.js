"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            notification.belongsTo(models.user, { foreignKey: "userId" });
            notification.belongsTo(models.flight, { foreignKey: "flightId" });
        }
    }
    notification.init(
        {
            userId: DataTypes.INTEGER,
            flightId: DataTypes.INTEGER,
            message: DataTypes.TEXT,
            type: DataTypes.STRING,
            isRead: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "notification",
            paranoid: true,
        },
    );
    return notification;
};
