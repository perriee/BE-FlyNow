const { Router } = require("express");
const {
    createFavoriteFlight,
    deleteFavoriteFlight,
    editFavoriteFlightbyFlightId,
    getAllFavoriteFlights,
    getFavoriteFlightByFlightId,
} = require("../controller/favoriteFlight");
const { authMiddleware } = require("../middleware/auth");

const router = Router();

router
    .route("/")
    .post(authMiddleware(), createFavoriteFlight)
    .get(getAllFavoriteFlights);

router
    .route("/:flightId")
    .get(getFavoriteFlightByFlightId)
    .patch(authMiddleware(), editFavoriteFlightbyFlightId)
    .delete(authMiddleware(), deleteFavoriteFlight);

module.exports = router;
