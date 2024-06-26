const express = require("express");

const router = express.Router();
const {
    register,
    login,
    profile,
    googleLogin,
    forgotPassword,
    resetPassword,
    verifyOTP,
    resendOTP,
    editProfile,
} = require("../controller/auth");
const {
    authMiddleware,
    verifyResetPasswordToken,
} = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/profile", authMiddleware(), profile);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", verifyResetPasswordToken(), resetPassword);
router.put("/resend-otp", resendOTP);
router.put("/verify-otp", verifyOTP);
router.patch("/edit-profile", authMiddleware(), editProfile);

module.exports = router;
