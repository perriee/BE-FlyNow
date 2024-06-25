const { Router } = require("express");
const {
    createFavoriteFlight,
    deleteFavoriteFlightById,
    editFavoriteFlightById,
    getAllFavoriteFlights,
    getFavoriteFlightById,
} = require("../controller/favoriteFlight");
const { authMiddleware } = require("../middleware/auth");

const router = Router();

router
    .route("/")
    .post(authMiddleware(), createFavoriteFlight)
    .get(getAllFavoriteFlights);

router
    .route("/:id")
    .get(getFavoriteFlightById)
    .patch(authMiddleware(), editFavoriteFlightById)
    .delete(authMiddleware(), deleteFavoriteFlightById);

module.exports = router;
