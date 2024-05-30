const passengerUsecase = require("../usecase/passenger");
const bookingUsecase = require("../usecase/booking");
const bookingDetailUsecase = require("../usecase/bookingDetail")

exports.getPassengers = async (req, res, next) => {
    try {
        const data = await passengerUsecase.getPassengers();
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getPassenger = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await passengerUsecase.getPassenger(id);

        if (!data) {
            return next({
                message: `Passenger is not found!`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createPassenger = async (req, res, next) => {
    try {
        const passengers = [ // Ini ceritanya payload dari req.body nya
            {
                name: "Jane Smith",
                dateOfBirth: "1985-06-15T00:00:00.000Z",
                nationality: "Canada",
                docType: "paspor",
                docNumber: "C987654",
                issuingCountry: "Canada",
                expiryDate: "2028-12-31T00:00:00.000Z",
                passengerType: "adult",
                seatId: 1, // Ga dimasukin pas createPassenger
                price: 125 // Ga dimasukin pas createPassenger
            },
            {
                name: "John Smith",
                dateOfBirth: "1985-06-15T00:00:00.000Z",
                nationality: "Canada",
                docType: "paspor",
                docNumber: "C987654",
                issuingCountry: "Canada",
                expiryDate: "2028-12-31T00:00:00.000Z",
                passengerType: "adult",
                seatId: 2, // Ga dimasukin pas createPassenger
                price: 125 // Ga dimasukin pas createPassenger
            },
        ];

        const booking = { // Ini ceritanya payload dari req.body nya
            bookingCode: "BK001",
                flightId: "1",
                userId: "1",
                numAdults: 2,
                numChildren: 1,
                numBabies: 0
        }

        const passengersData = await Promise.all( // Pake promise all soalnya pake async await di dalemnya
            passengers.map(async (passenger) => {
                const result =
                    await passengerUsecase.createPassenger({
                        name: passenger.name,
                        dateOfBirth: passenger.dateOfBirth,
                        nationality:passenger.nationality,
                        docType: passenger.docType,
                        docNumber: passenger.docNumber,
                        issuingCountry: passenger.issuingCountry,
                        expiryDate: passenger.expiryDate,
                        passengerType: passenger.passengerType,
                    });
                return result.dataValues;
            }),
        );

        const bookingData = await bookingUsecase.createBooking(booking)

        const bookingDetailsData = await Promise.all(
            passengersData.map(async (passenger, id) => {
                const result =
                    await bookingDetailUsecase.createBookingDetail({
                        bookingId: bookingData.id,
                        passengerId: passenger.id,
                        seatId: passengers[id].seatId,
                    });
                return result.dataValues;
            }),
        );

        res.status(201).json({
            message: "success",
            data: {
                booking: bookingData,
                bookingDetails: bookingDetailsData,
                passengers: passengersData
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePassenger = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            name,
            dateOfBirth,
            nationality,
            docType,
            docNumber,
            issuingCountry,
            expiryDate,
            passengerType,
        } = req.body;

        if (!name || name == "") {
            return next({
                message: "name must be provided!",
                statusCode: 404,
            });
        }
        if (!dateOfBirth || dateOfBirth == "") {
            return next({
                message: "dateOfBirth must be provided!",
                statusCode: 404,
            });
        }
        if (!nationality || nationality == "") {
            return next({
                message: "nationality must be provided!",
                statusCode: 404,
            });
        }
        if (!docType || docType == "") {
            return next({
                message: "docType must be provided!",
                statusCode: 404,
            });
        }
        if (!docNumber || docNumber == "") {
            return next({
                message: "docNumber must be provided!",
                statusCode: 404,
            });
        }
        if (!issuingCountry || issuingCountry == "") {
            return next({
                message: "issuingCountry must be provided!",
                statusCode: 404,
            });
        }
        if (!expiryDate || expiryDate == "") {
            return next({
                message: "expiryDate must be provided!",
                statusCode: 404,
            });
        }
        if (!passengerType || passengerType == "") {
            return next({
                message: "passengerType must be provided!",
                statusCode: 404,
            });
        }

        const data = await passengerUsecase.updatePassenger(id, {
            name,
            dateOfBirth,
            nationality,
            docType,
            docNumber,
            issuingCountry,
            expiryDate,
            passengerType,
        });

        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deletePassenger = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await passengerUsecase.deletePassenger(id);

        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};
