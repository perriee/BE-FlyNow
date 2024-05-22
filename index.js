require("dotenv").config(); // enable dotenv

const express = require("express");
const router = require("./route");
const fileUpload = require("express-fileupload");

const app = express();
const port = 3000;

app.use(express.json()); // get body -> json
app.use(fileUpload({ useTempFiles: true })); // get body -> form-data
app.use(express.static("public"));

app.use("/api/v1", router);

// Error middleware
app.use((err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.statusCode) {
        statusCode = err.statusCode;
    }
    if (err.message) {
        message = err.message;
    }

    res.status(statusCode).json({
        data: null,
        message,
    });
});

app.listen(port, () => console.log("Server running on port", port));
