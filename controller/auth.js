const { register, login } = require("../usecase/auth");

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
        });

        res.status(201).json({
            message: "User created successfully",
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
