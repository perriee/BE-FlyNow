const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile } = require("../usecase/auth/index");

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
