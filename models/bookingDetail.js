const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class bookingDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            bookingDetail.belongsTo(models.booking, {
                foreignKey: "bookingId",
                as: "booking",
            });
            bookingDetail.belongsTo(models.passenger, {
                foreignKey: "passengerId",
                as: "passenger",
            });
            bookingDetail.belongsTo(models.seat, {
                foreignKey: "seatId",
                as: "seat",
            });
        }
    }
    bookingDetail.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            bookingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "booking",
                    key: "id",
                },
            },
            passengerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "passenger",
                    key: "id",
                },
            },
            seatId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "seat",
                    key: "id",
                },
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "bookingDetail",
            tableName: "booking_details",
            paranoid: true,
        },
    );
    return bookingDetail;
};
