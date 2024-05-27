const path = require("path");
const { uploadToCloudinary } = require("../../helper/cloudinary");
const airline = require("../../models/airline");

exports.createAirline = async (payload) => {
    if (payload.photo) {
        // upload image to cloudinary
        const { photo } = payload;

        // make unique filename -> 213123128uasod9as8djas
        photo.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        // Process to upload image
        const imageUpload = await uploadToCloudinary(photo);
        payload.photo = imageUpload.secure_url;
    }

    const data = await airline.create(payload);
    return data;
};

exports.getAirlines = () => {
    const data = airline.findAll();
    return data;
};

exports.getAirlineById = (id) => {
    const data = airline.findOne({
        where: {
            id,
        },
    });

    return data;
};

exports.updateAirlineById = async (id, payload) => {
    if (payload.photo) {
        // upload image to cloudinary
        const { photo } = payload;

        // make unique filename -> 213123128uasod9as8djas
        photo.publicId = crypto.randomBytes(16).toString("hex");

        // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
        photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

        // Process to upload image
        const imageUpload = await uploadToCloudinary(photo);
        payload.photo = imageUpload.secure_url;
    }

    const data = await airline.update(payload, {
        where: {
            id,
        },
    });

    return data;
};

exports.deleteAirlineById = (id) => {
    const data = airline.destroy({
        where: {
            id,
        },
    });

    return data;
};
