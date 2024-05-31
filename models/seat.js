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
            seat.belongsToMany(models.passenger, {
                through: "bookingDetail",
            });
            seat.belongsTo(models.flight, { foreignKey: "flightId" });
        }
    }
    seat.init(
        {
            seatCode: DataTypes.STRING,
            seatAvailable: DataTypes.BOOLEAN,
            flightId: DataTypes.INTEGER,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "seat",
            paranoid: true,
        },
    );
    return seat;
};
