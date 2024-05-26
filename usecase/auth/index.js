const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
    createUser,
    getUserByID,
    getUserByEmail,
} = require("../../repository/user");

exports.register = async (payload) => {
    let user = await createUser(payload);

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
