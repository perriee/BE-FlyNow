const cloudinary = require("../config/cloudinary");

exports.uploadToCloudinary = (file) => {
    return new Promise(function (resolve, reject) {
        cloudinary.uploader.upload(
            file.tempFilePath,
            { public_id: file.publicId },
            function (error, result) {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            },
        );
    });
};
