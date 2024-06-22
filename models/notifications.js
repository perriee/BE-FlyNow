"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class notifications extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            notifications.belongsTo(models.users, { foreignKey: "userId" });
            notifications.belongsTo(models.flights, { foreignKey: "flightId" });
            notifications.belongsTo(models.payments, {
                foreignKey: "paymentId",
            });
        }
    }
    notifications.init(
        {
            userId: DataTypes.INTEGER,
            flightId: DataTypes.INTEGER,
            paymentId: DataTypes.INTEGER,
            message: DataTypes.TEXT,
            type: DataTypes.STRING,
            isRead: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "notifications",
        },
    );
    return notifications;
};
