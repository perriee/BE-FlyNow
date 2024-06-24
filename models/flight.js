const { Model, ENUM } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class flight extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            flight.hasMany(models.seat, { foreignKey: "flightId" });
            flight.hasMany(models.booking, { foreignKey: "departureFlightId" });
            flight.hasMany(models.booking, { foreignKey: "returnFlightId" });
            flight.belongsTo(models.airline, { foreignKey: "airlineId" });
            flight.belongsTo(models.airport, {
                as: 'departureAirport',
                foreignKey: "departureAirportId",
            });
            flight.belongsTo(models.airport, {
                as: 'arrivalAirport',
                foreignKey: "arrivalAirportId",
            });
            flight.hasMany(models.favoriteFlight, { foreignKey: "flightId" });
        }
    }
    flight.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            flightCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            terminal: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            departureAirportId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            arrivalAirportId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            airlineId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "airline",
                    key: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
            departureTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            arrivalTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            flightClass: {
                type: ENUM("economy", "business", "first_class"),
                allowNull: false,
            },
            information: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "flight",
            paranoid: true,
        },
    );
    return flight;
};
