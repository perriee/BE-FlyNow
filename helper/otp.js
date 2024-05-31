const otpGenerator = require("otp-generator");

exports.generateOTP = () => {
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });

    return { code: otp, createdAt: new Date() };
};

exports.checkOTP = (otpFromRequest, otpFromDB, otpCreatedAt) => {
    // Set OTP expiration time to 30 minutes
    const otpExpired = 30 * 60 * 1000;
    const currentTime = new Date();

    const isValid = otpFromRequest === otpFromDB;
    const isExpired = currentTime - otpCreatedAt > otpExpired;

    if (isValid && !isExpired) {
        return true;
    } else if (!isValid) {
        // OTP is invalid
        throw new Error("Invalid OTP");
    } else {
        // OTP is expired
        throw new Error("OTP Expired");
    }
};
