const nodemailer = require("nodemailer");

const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD } = process.env;

exports.sendEmail = (data) => {
    try {
        const transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: true,
            requireTLS: true,
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD,
            },
        });

        return transporter.sendMail(data);
    } catch (error) {
        return console.error(error);
    }
};
