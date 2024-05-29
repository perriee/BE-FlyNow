const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile, getUserByResetPwdToken } = require("../usecase/auth/index");

exports.authMiddleware = (roles) => async (req, res, next) => {
    try {
        // get token from header
        const token = getTokenFromHeaders(req.headers);

        // extract token to get user information
        const extractedToken = extractToken(token);

        // get user by id
        const user = await profile(extractedToken?.id);

        // get role and validate
        // if (!roles.includes(user?.role)) {
        //     return next({
        //         message: "Forbidden!",
        //         statusCode: 403,
        //     });
        // }

        // pass the user profile to request
        req.user = user;

        next(); // jika middleware ini success maka akan next ke middleware selanjutnya
    } catch (error) {
        error.statusCode = 401; // error unauthorized
        next(error);
    }
};

exports.verifyResetPasswordToken = () => async (req, res, next) => {
    try {
        const { token } = req.body;

        // check if the reset password token exists and is valid
        await getUserByResetPwdToken(token);

        // if token is valid, proceed to the reset password controller
        next();
    } catch (error) {
        error.statusCode = 401; // error unauthorized
        next(error);
    }
};
