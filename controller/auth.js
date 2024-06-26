const { sendEmail } = require("../helper/nodemailer");
const {
    register,
    login,
    googleLogin,
    updateUserResetPwdToken,
    getUserByEmail,
    getUserByResetPwdToken,
    updateUserPassword,
    updateUserIsVerified,
    updateUserOTP,
    editProfile,
} = require("../usecase/auth");
const { createToken } = require("../usecase/auth/util");
const { generateOTP, checkOTP } = require("../helper/otp");
const {
    forgotPasswordEmail,
    registerEmail,
    resendOTPEmail,
} = require("../templates/email");

exports.register = async (req, res, next) => {
    try {
        // get the body
        const { name, email, password, phoneNumber } = req.body;

        // get the image
        const image = req?.files?.image;

        // generate OTP
        const otpData = generateOTP();
        const otp = otpData.code;
        const otpCreatedAt = otpData.createdAt;

        // validate request
        if (!name || name === "") {
            return next({
                message: "name is required",
                statusCode: 400,
            });
        }
        if (!email || email === "") {
            return next({
                message: "email is required",
                statusCode: 400,
            });
        }
        if (!password || password === "") {
            return next({
                message: "password is required",
                statusCode: 400,
            });
        }
        if (!phoneNumber || phoneNumber === "") {
            return next({
                message: "phoneNumber is required",
                statusCode: 400,
            });
        }

        const data = await register({
            name,
            email,
            password,
            image,
            phoneNumber,
            isVerified: false,
            otp,
            otpCreatedAt,
        });

        const emailTemplate = registerEmail(email, name, otp);

        sendEmail(emailTemplate);

        res.status(201).json({
            message: "Register Successful",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // validate request
        if (!email || email === "") {
            return next({
                message: "email is required",
                statusCode: 400,
            });
        }
        if (!password || password === "") {
            return next({
                message: "password is required",
                statusCode: 400,
            });
        }

        const data = await login({
            email,
            password,
        });

        res.status(200).json({
            message: "Login Successful",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.googleLogin = async (req, res, next) => {
    try {
        // get the body
        const { access_token } = req.body;

        if (!access_token) {
            return next({
                statusCode: 400,
                message: "Access token must be provided!",
            });
        }

        // login with google logic
        const data = await googleLogin(access_token);

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.profile = async (req, res, next) => {
    try {
        // get user by id
        const data = req.user;

        res.status(200).json({
            message: "User Profile retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await getUserByEmail(email);

        if (!user) {
            return next({
                message: `User is not found`,
                statusCode: 400,
            });
        }
        if (!user.isVerified) {
            return next({
                message: `User is not verified`,
                statusCode: 400,
            });
        }

        const { id, name } = user;
        const { token } = createToken(id);

        await updateUserResetPwdToken(id, {
            resetPasswordToken: token,
        });

        const emailTemplate = forgotPasswordEmail(email, name, token);

        sendEmail(emailTemplate);

        return res.status(200).json({
            message: "Reset Password Link Successfully Sent",
        });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { token, password, confirmPassword } = req.body;

        const user = await getUserByResetPwdToken(token);
        const { id } = user;

        if (password !== confirmPassword) {
            return next({
                message: `Password does not match`,
                statusCode: 400,
            });
        }
        if (!user) {
            return next({
                message: `User doesn't exist`,
                statusCode: 400,
            });
        }

        // update user password
        await updateUserPassword(token, password);

        // set resetPasswordToken to null when user already update the password
        await updateUserResetPwdToken(id, {
            resetPasswordToken: null,
        });

        return res.status(200).json({
            message: "Password successfully changed",
        });
    } catch (error) {
        next(error);
    }
};

exports.resendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;

        // generate new OTP
        const otpData = generateOTP();
        const otp = otpData.code;
        const otpCreatedAt = otpData.createdAt;

        const user = await getUserByEmail(email);

        if (!user) {
            return next({
                message: `User is not found`,
                statusCode: 400,
            });
        }
        if (user.isVerified) {
            return next({
                message: `User has been verified`,
                statusCode: 400,
            });
        }

        // Update user otp data
        await updateUserOTP(user.id, {
            otp,
            otpCreatedAt,
        });

        const emailTemplate = resendOTPEmail(email, user.name, otp);

        sendEmail(emailTemplate);

        return res.status(200).json({
            message: "New OTP has been sent to your email",
        });
    } catch (error) {
        next(error);
    }
};

exports.verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const user = await getUserByEmail(email);

        if (!user) {
            return next({
                message: `User doesn't exist`,
                statusCode: 400,
            });
        }

        // check if otp is valid
        try {
            checkOTP(otp, user.otp, user.otpCreatedAt);
        } catch (error) {
            if (error.message === "Invalid OTP") {
                return next({
                    message: "The provided OTP is invalid.",
                    statusCode: 400,
                });
            } else if (error.message === "OTP Expired") {
                return next({
                    message: "The OTP has expired.",
                    statusCode: 400,
                });
            } else {
                return next({
                    message: "An unexpected error occurred.",
                    statusCode: 500,
                });
            }
        }

        // if otp is valid, set isVerified to true
        await updateUserIsVerified(user.id, { isVerified: true });

        // set otp and otpCreatedAt to null when user already verify
        await updateUserOTP(user.id, { otp: null, otpCreatedAt: null });

        return res.status(200).json({
            message: "User already verified",
        });
    } catch (error) {
        next(error);
    }
};

exports.editProfile = async (req, res, next) => {
    try {
        const { name, phoneNumber } = req.body;
        const image = req?.files?.image;
        let payload = {};

        if (name != "" && name) {
            payload.name = name;
        }
        if (phoneNumber != "" && phoneNumber) {
            payload.phoneNumber = phoneNumber;
        }
        if (image) {
            payload.image = image;
        }

        console.log(req.body);
        if (Object.keys(payload).length === 0) {
            throw new Error("Nothing to update!");
        }

        const data = await editProfile(req.user.id, payload);

        res.status(200).json({
            message: "Profile updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};
