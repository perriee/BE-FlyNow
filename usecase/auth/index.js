const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
    createUser,
    getUserByID,
    getUserByEmail,
    getGoogleAccessTokenData,
    getUserByResetPwdToken,
    updateUserResetPwdToken,
} = require("../../repository/user");
const { createToken } = require("./util");

exports.register = async (payload) => {
    const user = await createUser(payload);

    // delete password frm object, agar tidak muncul di response
    delete user.dataValues.password;

    // create token
    const jwtPayload = {
        id: user.id,
    };

    const token = jsonWebToken.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    const data = {
        user,
        token,
    };

    return data;
};

exports.login = async (payload) => {
    const user = await getUserByEmail(payload.email);

    if (!user) {
        throw new Error(`User ${payload.email} does not exist`);
    }

    // compare password
    const passwordMatch = await bcrypt.compareSync(
        payload.password,
        user.password,
    );

    if (!passwordMatch) {
        throw new Error("Wrong password!");
    }

    // delete password from object, agar tidak muncul di response
    if (user?.dataValues?.password) {
        delete user.dataValues.password;
    } else {
        delete user.password;
    }

    // create token
    const jwtPayload = {
        id: user.id,
    };

    const token = jsonWebToken.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    const data = {
        user,
        token,
    };

    return data;
};

exports.googleLogin = async (accessToken) => {
    // validate the token and get the data from google
    const googleData = await getGoogleAccessTokenData(accessToken);
    console.log("google-data", googleData);

    // get is there any existing user with the email
    let user = await getUserByEmail(googleData?.email);
    console.log("user", user);

    // if not found
    if (!user) {
        // Create new user based on google data that get by access_token
        user = await createUser({
            name: googleData?.name,
            email: googleData?.email,
            password: "",
            image: googleData?.picture,
            // ! NOTE: kalo nanti error karna phone number nya not null, kasi nilai default seperti di bawah ini saja
            // phoneNumber: "08",
        });
    }

    // Delete object password from user
    delete user?.dataValues?.password;

    // create token
    const data = createToken(user);

    return data;
};

exports.profile = async (id) => {
    // get user
    let user = await getUserByID(id);
    if (!user) {
        throw new Error(`User with id ${id} is not found`);
    }

    // delete password from object, agar tidak muncul di response
    if (user?.dataValues?.password) {
        delete user.dataValues.password;
    } else {
        delete user.password;
    }

    return user;
};

exports.getUserByEmail = async (email) => {
    const data = await getUserByEmail(email);
    return data;
};

exports.getUserByResetPwdToken = async (token) => {
    const data = await getUserByResetPwdToken(token);
    return data;
};

exports.updateUserResetPwdToken = async (id, payload) => {
    const data = await updateUserResetPwdToken(id, payload);
    return data;
};
