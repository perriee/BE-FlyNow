const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            payment.belongsTo(models.booking, { foreignKey: "bookingId" });
        }
    }
    payment.init(
        {
            bookingId: DataTypes.BIGINT,
            paymentAmount: DataTypes.INTEGER,
            paymentMethod: DataTypes.STRING,
            paymentStatus: DataTypes.ENUM("paid", "pending", "expired"),
            transactionId: DataTypes.STRING,
            snapToken: DataTypes.STRING,
            snapRedirectUrl: DataTypes.STRING,
            expiryTime: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "payment",
            tableName: "payments",
            paranoid: true,
        },
    );
    return payment;
};
