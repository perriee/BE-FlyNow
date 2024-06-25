const favoriteFlightRepo = require("../../repository/favoriteFlight/index");
const flightRepo = require("../../repository/flight/index");

exports.createFavoriteFlight = async (payload) =>
    favoriteFlightRepo.createFavoriteFlight(payload);

exports.getFavoriteFlightByFlightId = async (flightId) => {
    const favoriteFlight =
        await favoriteFlightRepo.getFavoriteFlightByFlightId(flightId);
    const flightDetail = await flightRepo.getFlight(flightId);
    const responseData = {
        flightId: favoriteFlight.flightId,
        airlineId: flightDetail.airline.id,
        airline: flightDetail.airline.airlineName,
        departureAirportId: flightDetail.departureAirport.id,
        departureAirport: flightDetail.departureAirport.airportName,
        arrivalAirportId: flightDetail.arrivalAirport.id,
        arrivalAirport: flightDetail.arrivalAirport.airportName,
        departureTime: flightDetail.departureTime,
        price: flightDetail.price,
        discount: favoriteFlight.discount,
        description: favoriteFlight.description,
        isFavorite: favoriteFlight.isFavorite,
        image: favoriteFlight.image,
    };
    return responseData;
};

exports.getAllFavoriteFlights = async () => {
    const data = await favoriteFlightRepo.getAllFavoriteFlights();

    const promises = data.map(async (flight) => {
        const flightDetail = await flightRepo.getFlight(flight.flightId);
        return {
            flightId: flight.flightId,
            airlineId: flightDetail.airline.id,
            airline: flightDetail.airline.airlineName,
            departureAirportId: flightDetail.departureAirport.id,
            departureAirport: flightDetail.departureAirport.airportName,
            arrivalAirportId: flightDetail.arrivalAirport.id,
            arrivalAirport: flightDetail.arrivalAirport.airportName,
            departureTime: flightDetail.departureTime,
            price: flightDetail.price,
            discount: flight.discount,
            description: flight.description,
            isFavorite: flight.isFavorite,
            image: flight.image,
        };
    });

    const responseData = await Promise.all(promises);

    return responseData;
};

exports.editFavoriteFlightbyFlightId = async (flightId, payload) => {
    const data = await favoriteFlightRepo.editFavoriteFlightbyFlightId(
        flightId,
        payload,
    );
    return data;
};

exports.deleteFavoriteFlight = async (flightId) =>
    favoriteFlightRepo.deleteFavoriteFlight(flightId);
