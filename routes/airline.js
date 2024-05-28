const { Router } = require("express");
const {
    createAirline,
    getAirlines,
    getAirlineById,
    updateAirlineById,
    deleteAirlineById,
} = require("../controller/airline");

const router = Router();

router.route("/").post(createAirline).get(getAirlines);

router
    .route("/:id")
    .get(getAirlineById)
    .put(updateAirlineById)
    .delete(deleteAirlineById);

module.exports = router;
