const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class airline extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            airline.hasMany(models.flight, { foreignKey: "airlineId" });
        }
    }
    airline.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            airlineCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            airlineName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT,
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
            modelName: "airline",
            paranoid: true,
        },
    );
    return airline;
};
