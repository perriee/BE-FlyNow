const favoriteFlightRepo = require("../../repository/favoriteFlight/index");
const flightRepo = require("../../repository/flight/index");

exports.createFavoriteFlight = async (payload) =>
    favoriteFlightRepo.createFavoriteFlight(payload);

exports.getFavoriteFlightById = async (id) => {
    const favoriteFlight = await favoriteFlightRepo.getFavoriteFlightById(id);
    const flightDetail = await flightRepo.getFlight(favoriteFlight.flightId);
    const responseData = {
        id: favoriteFlight.id,
        flightId: favoriteFlight.flightId,
        airlineId: flightDetail.airline.id,
        airline: flightDetail.airline.airlineName,

        departureAirportId: flightDetail.departureAirport.id,
        departureAirport: flightDetail.departureAirport.airportName,
        departureCity: flightDetail.departureAirport.city,

        arrivalAirportId: flightDetail.arrivalAirport.id,
        arrivalAirport: flightDetail.arrivalAirport.airportName,
        arrivalCity: flightDetail.arrivalAirport.city,

        departureTime: flightDetail.departureTime,
        price: flightDetail.price,
        discount: favoriteFlight.discount,
        description: favoriteFlight.description,
        isFavorite: favoriteFlight.isFavorite,
        image: favoriteFlight.image,
        createdAt: favoriteFlight.createdAt,
        updatedAt: favoriteFlight.updatedAt,
        deletedAt: favoriteFlight.deletedAt,
    };
    return responseData;
};

exports.getAllFavoriteFlights = async () => {
    const data = await favoriteFlightRepo.getAllFavoriteFlights();

    const promises = data.map(async (flight) => {
        const flightDetail = await flightRepo.getFlight(flight.flightId);
        return {
            id: flight.id,
            flightId: flight.flightId,
            airlineId: flightDetail.airline.id,
            airline: flightDetail.airline.airlineName,

            departureAirportId: flightDetail.departureAirport.id,
            departureAirport: flightDetail.departureAirport.airportName,
            departureCity: flightDetail.departureAirport.city,

            arrivalAirportId: flightDetail.arrivalAirport.id,
            arrivalAirport: flightDetail.arrivalAirport.airportName,
            arrivalCity: flightDetail.arrivalAirport.city,

            departureTime: flightDetail.departureTime,
            price: flightDetail.price,
            discount: flight.discount,
            description: flight.description,
            isFavorite: flight.isFavorite,
            image: flight.image,
            createdAt: flight.createdAt,
            updatedAt: flight.updatedAt,
            deletedAt: flight.deletedAt,
        };
    });

    const responseData = await Promise.all(promises);

    return responseData;
};

exports.editFavoriteFlightById = async (id, payload) => {
    const data = await favoriteFlightRepo.editFavoriteFlightById(id, payload);
    return data;
};

exports.deleteFavoriteFlightById = async (id) =>
    favoriteFlightRepo.deleteFavoriteFlightById(id);
