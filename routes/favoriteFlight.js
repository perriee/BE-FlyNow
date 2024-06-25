const { Router } = require("express");
const {
    createFavoriteFlight,
    deleteFavoriteFlight,
    editFavoriteFlightbyFlightId,
    getAllFavoriteFlights,
    getFavoriteFlightByFlightId,
} = require("../controller/favoriteFlight");

const router = Router();

router.route("/").post(createFavoriteFlight).get(getAllFavoriteFlights);

router
    .route("/:flightId")
    .get(getFavoriteFlightByFlightId)
    .patch(editFavoriteFlightbyFlightId)
    .delete(deleteFavoriteFlight);

module.exports = router;
