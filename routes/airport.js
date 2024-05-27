const express = require("express");
const router = express.Router();

const {
    createAirport,
    getAllAirports,
    getAirportByID,
    editAirport,
    deleteAirport,
    filterAirport,
} = require("../controller/airport");

router.post("/", createAirport);
router.get("/", getAllAirports);
router.get("/filter", filterAirport);
router.get("/:id", getAirportByID);
router.patch("/:id", editAirport);
router.delete("/:id", deleteAirport);

module.exports = router;
