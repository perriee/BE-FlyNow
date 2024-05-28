const bcrypt = require("bcrypt");
const { sendEmail } = require("../helper/nodemailer");
const {
    register,
    login,
    googleLogin,
    updateUserResetPwdToken,
    getUserByEmail,
    getUserByResetPwdToken,
} = require("../usecase/auth");
const { createToken } = require("../usecase/auth/util");

const { CLIENT_URL, MAIL_USERNAME } = process.env;

exports.register = async (req, res, next) => {
    try {
        // get the body
        const { name, email, password, phoneNumber } = req.body;

        // get the image
        const image = req?.files?.image;

        // validate request
        if (!name || name == "") {
            return next({
                message: "name is required",
                statusCode: 400,
            });
        }
        if (!email || email == "") {
            return next({
                message: "email is required",
                statusCode: 400,
            });
        }
        if (!password || password == "") {
            return next({
                message: "password is required",
                statusCode: 400,
            });
        }
        if (!phoneNumber || phoneNumber == "") {
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
        });

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
        if (!email || email == "") {
            return next({
                message: "email is required",
                statusCode: 400,
            });
        }
        if (!password || password == "") {
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

        const { id } = user;
        const { token } = createToken(id);

        await updateUserResetPwdToken(id, {
            resetPasswordToken: token,
        });

        const emailTemplate = {
            from: {
                name: "FlyNow Support",
                address: MAIL_USERNAME,
            },
            to: email,
            subject: "Link Reset Password",
            html: `<p>Silahkan klik link dibawah ini untuk reset password</p> <p>${CLIENT_URL}/reset-password/${token}</p>`,
        };

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

        const hashPassword = bcrypt.hashSync(password, 10);
        user.password = hashPassword;
        await user.save();

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
