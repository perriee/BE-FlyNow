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
            booking.belongsToMany(models.passenger, {
                through: "bookingDetail",
            });
            booking.belongsToMany(models.seat, {
                through: "bookingDetail",
            });
            booking.hasMany(models.bookingDetail, {
                foreignKey: "bookingId",
                as: "bookingDetails",
            });

            booking.hasOne(models.payment, { foreignKey: "bookingId" });
            booking.belongsTo(models.user, { foreignKey: "userId" });
            booking.belongsTo(models.flight, {
                foreignKey: "departureFlightId",
            });
            booking.belongsTo(models.flight, {
                foreignKey: "returnFlightId",
            });
        }
    }
    booking.init(
        {
            bookingCode: DataTypes.STRING,
            departureFlightId: {
                allowNull: false,
                type: DataTypes.BIGINT,
                references: {
                    model: "flight",
                    key: "id",
                },
            },
            returnFlightId: {
                allowNull: true,
                type: DataTypes.BIGINT,
                references: {
                    model: "flight",
                    key: "id",
                },
            },
            userId: DataTypes.BIGINT,
            numAdults: DataTypes.INTEGER,
            numChildren: DataTypes.INTEGER,
            numBabies: DataTypes.INTEGER,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "booking",
            paranoid: true,
            timestamps: true,
        },
    );
    return booking;
};
