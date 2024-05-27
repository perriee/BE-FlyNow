const express = require("express");

const router = express.Router();
const { register, login, profile } = require("../controller/auth");
const { authMiddleware } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware(), profile);

module.exports = router;
