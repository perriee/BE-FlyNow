const crypto = require("crypto"); // generate random string
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");
const { user } = require("../../models");
const { uploadToCloudinary } = require("../../helper/cloudinary");

exports.createUser = async (payload) => {
    // check if the email already exists
    const existingUser = await user.findOne({
        where: { email: payload.email },
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // encrypt the password
    payload.password = bcrypt.hashSync(payload.password, 10);

    if (payload.image) {
        // upload image to cloudinary
        const { image } = payload;

        // make unique filename -> skdj834833hj.png
        image.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file to unique
        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        // process to upload image
        const imageUpload = await uploadToCloudinary(image);
        payload.image = imageUpload.secure_url;
    }

    // create data to postgres
    const data = await user.create(payload);

    return data;
};

exports.getUserByID = async (id) => {
    // get data from db
    let data = await user.findAll({
        where: {
            id,
        },
    });
    if (data.length > 0) {
        return data[0];
    }

    throw new Error(`User is not found!`);
};

exports.getUserByEmail = async (email) => {
    // get data from db
    let data = await user.findAll({
        where: {
            email,
        },
    });
    if (data.length > 0) {
        return data[0];
    }

    throw new Error(`User with email ${email} is not found!`);
};

exports.getGoogleAccessTokenData = async (accessToken) => {
    const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
    );
    return response.data;
};
