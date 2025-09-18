const express = require('express');
const cors = require("cors");
const contactRoutes = require("./app/Routes/contact.route");
const ApiError = require("./app/api-error");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});

app.use("/api/contacts", contactRoutes);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" ,

    });
});
module.exports = app;