const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan"); 
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt"); 
process.env.SECRET;
const PORT = process.env.PORT || 8100;

app.use(express.json()); 
app.use(morgan("dev")); 

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to the DB");
    })
    .catch((error) => {
        console.error("Error connecting to the DB", error);
    });

//middleware//
// app.use("/sauces", require("./routes/sauceRouter.js"))
app.use(
    "/api",
    expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);
app.use("/auth", require("./routes/authRouter.js"));
app.use("/api/sauce", require("./routes/sauceRouter.js"));
app.use("/api/comment", require("./routes/commentRouter.js"));

//Error handler/s
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log("The server is running on port ${PORT}");
});
