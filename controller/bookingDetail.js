// const bookingUsecase = require("../usecase/booking");

// exports.createBookingDetail = async (req, res, next) => {
//     try {
//         const {
//             bookingId, passengerId, seatId, 
//         } = req.body;

//         if (!bookingCode || bookingCode == "") {
//             return next({
//                 message: "Booking Code must be filled",
//                 statusCode: 400,
//             });
//         }
//         if (!flightId || flightId == "") {
//             return next({
//                 message: "Flight Id must be filled",
//                 statusCode: 400,
//             });
//         }
//         if (!userId || userId == "") {
//             return next({
//                 message: "User Id must be filled",
//                 statusCode: 400,
//             });
//         }
//         if (!numAdults || numAdults == "") {
//             return next({
//                 message: "Number Adults must be filled",
//                 statusCode: 400,
//             });
//         }

//         const data = await bookingUsecase.createBooking({
//             bookingCode,
//             flightId,
//             userId,
//             numAdults,
//             numChildren,
//             numBabies,
//         });

//         res.status(200).json({
//             message: "Success",
//             data,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
