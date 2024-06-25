const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    /** @type {import('sequelize').Model} */
    class favoriteFlight extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            favoriteFlight.belongsTo(models.flight, {
                foreignKey: "flightId",
            });
        }
    }
    favoriteFlight.init(
        {
            flightId: {
                type: DataTypes.NUMBER,
                references: {
                    model: "flights",
                    key: "id",
                },
            },
            isFavorite: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            discount: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
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
            modelName: "favoriteFlight",
            paranoid: true,
            tableName: "favorite_flights",
        },
    );
    return favoriteFlight;
};
