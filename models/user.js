const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user.hasMany(models.booking, { foreignKey: "userId" });
            user.hasMany(models.notification, { foreignKey: "userId" });
        }
    }
    user.init(
        {
            name: DataTypes.STRING,
            email: {
                unique: true,
                type: DataTypes.STRING,
            },
            password: DataTypes.TEXT,
            image: DataTypes.TEXT,
            phoneNumber: DataTypes.STRING,
            isVerified: DataTypes.BOOLEAN,
            deletedAt: DataTypes.DATE,
            resetPasswordToken: DataTypes.STRING,
            otp: DataTypes.STRING,
            otpCreatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "user",
            paranoid: true,
        },
    );
    return user;
};
