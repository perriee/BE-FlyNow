const flightUsecase = require("../usecase/flight");

exports.getAllFlights = async (req, res, next) => {
    try {
      const data = await flightUsecase.getAllFlights();
  
      res.status(200).json({
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
};

exports.getFlight = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await flightUsecase.getFlight(id);
        if (!data) {
            return next({
                message: `Flight with id ${id} is not found!`,
                statuscode: 404,
            });
        }

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createFlight = async (req, res, next) => {
    try {
        const { 
          flightCode,
          terminal,
          departureAirportId,
          arrivalAirportId,
          airlineId,
          departureTime,
          arrivalTime,
          price,
          flightClass,
          information,
         } = req.body;
        if (!flightCode || flightCode == "") {
          return next({
            message: "Flight code must be provided!",
            statusCode: 400,
          });
        }
        if (!terminal || terminal == "") {
          return next({
            message: "Terminal must be provided!",
            statusCode: 400,
          });
        }
        if (!departureAirportId || departureAirportId == "") {
          return next({
            message: "Dearture airport id must be provided!",
            statusCode: 400,
          });
        }
        if (!arrivalAirportId || arrivalAirportId == "") {
          return next({
            message: "Arrival airport id must be provided!",
            statusCode: 400,
          });
        }
        if (!airlineId || airlineId == "") {
          return next({
            message: "Airline id must be provided!",
            statusCode: 400,
          });
        }
        if (!departureTime || departureTime == "") {
          return next({
            message: "Departure id must be provided!",
            statusCode: 400,
          });
        }
        if (!arrivalTime || arrivalTime == "") {
          return next({
            message: "Arrival time must be provided!",
            statusCode: 400,
          });
        }
        if (!price || price == "") {
          return next({
            message: "Price must be provided!",
            statusCode: 400,
          });
        }
        if (!flightClass || flightClass == "") {
          return next({
            message: "Flight class must be provided!",
            statusCode: 400,
          });
        }
        if (!information || information == "") {
          return next({
            message: "Inormation must be provided!",
            statusCode: 400,
          });
        }
    
        const data = await flightUsecase.createFlight({
            flightCode,
            terminal,
            departureAirportId,
            arrivalAirportId,
            airlineId,
            departureTime,
            arrivalTime,
            price,
            flightClass,
            information,
        });
    
        res.status(201).json({
          message: "Successs",
          data,
        });
      } catch (error) {
        next(error);
      }
};

exports.updateFlight = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { 
          flightCode,
          terminal,
          departureAirportId,
          arrivalAirportId,
          airlineId,
          departureTime,
          arrivalTime,
          price,
          flightClass,
          information,
         } = req.body;
        if (!flightCode || flightCode == "") {
          return next({
            message: "Flight code must be provided!",
            statusCode: 400,
          });
        }
        if (!terminal || terminal == "") {
          return next({
            message: "Terminal must be provided!",
            statusCode: 400,
          });
        }
        if (!departureAirportId || departureAirportId == "") {
          return next({
            message: "Dearture airport id must be provided!",
            statusCode: 400,
          });
        }
        if (!arrivalAirportId || arrivalAirportId == "") {
          return next({
            message: "Arrival airport id must be provided!",
            statusCode: 400,
          });
        }
        if (!airlineId || airlineId == "") {
          return next({
            message: "Airline id must be provided!",
            statusCode: 400,
          });
        }
        if (!departureTime || departureTime == "") {
          return next({
            message: "Departure id must be provided!",
            statusCode: 400,
          });
        }
        if (!arrivalTime || arrivalTime == "") {
          return next({
            message: "Arrival time must be provided!",
            statusCode: 400,
          });
        }
        if (!price || price == "") {
          return next({
            message: "Price must be provided!",
            statusCode: 400,
          });
        }
        if (!flightClass || flightClass == "") {
          return next({
            message: "Flight class must be provided!",
            statusCode: 400,
          });
        }
        if (!information || information == "") {
          return next({
            message: "Inormation must be provided!",
            statusCode: 400,
          });
        }
    
        const data = await flightUsecase.updateFlight(id,{
            flightCode,
            terminal,
            departureAirportId,
            arrivalAirportId,
            airlineId,
            departureTime,
            arrivalTime,
            price,
            flightClass,
            information,
        });
    
        res.status(201).json({
          message: "Successs",
          data,
        });
      } catch (error) {
        next(error);
      }
};

exports.deleteFlight = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await flightUsecase.deleteFlight(id);
  
      res.status(200).json({
        message: "Successs",
        data,
      });
    } catch (error) {
      next(error);
    }
  };