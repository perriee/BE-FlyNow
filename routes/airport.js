const express = require("express");
const router = express.Router();

const {
    createAirport,
    getAllAirports,
    getAirportByID,
    editAirport,
    deleteAirport,
    searchAirport,
} = require("../controller/airport");
const { authMiddleware } = require("../middleware/auth");

/* For "Admin" (won't be directly called in FE) */
router
    .route("/")
    .post(authMiddleware(), createAirport)
    .get(authMiddleware(), getAllAirports);
router
    .route("/:id")
    .patch(authMiddleware(), editAirport)
    .delete(authMiddleware(), deleteAirport);

/* For Users (will be directly called in FE) */
router.get("/search", searchAirport);
router.get("/:id", getAirportByID);

module.exports = router;
