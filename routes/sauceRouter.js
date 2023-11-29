const express = require("express");
const sauceRouter = express.Router();

const Sauce = require("../models/Sauce.js"); //

///app.use('/api/sauce', require('./routes/sauceRouter.js'))

//GET all sauces, regardless of user

//THIS WORKS!  ON THE BACK END ANYWAY
sauceRouter.get("/", (request, response, next) => {
    Sauce.find()
        .exec()
        .then((sauce) => {
            return response.status(200).send(sauce);
        })
        .catch((error) => {
            response.status(500);
            return next(error);
        });
});

//GET by user ID - THIS NOW WORKS AS EXPECTED
sauceRouter.get("/user", (req, res, next) => {
    Sauce.find({ user: req.auth._id })
        .then((sauces) => {
            res.status(200).send(sauces);
        })
        .catch((err) => {
            res.status(500);
            next(err);
        });
});

// /POST(add one); remember this goes throught the sauces.js and server.js(middleware) so have the correct name in postman --- http://localhost:8100/sauces/

//THIS ONE WORKS NOW TOO
sauceRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id;
    const newSauce = new Sauce(req.body);
    newSauce
        .save()
        .then((savedSauce) => {
            return res.status(200).send(savedSauce);
        })
        .catch((error) => {
            res.status(500);
            return next(error);
        });
});

//DELETE one
sauceRouter.delete("/:sauceId", (req, res, next) => {
    Sauce.findOneAndDelete({ _id: req.params.sauceId })
        .exec()
        .then((deletedSauce) => {
            if (!deletedSauce) {
                return res.status(404).send("Sauce not found");
            }
            return res.status(200).send("Sauce found");
        })
        .catch((error) => {
            res.status(500);
            return next(error);
        });
});

//UPDATE one
sauceRouter.put("/:sauceId", (req, res, next) => {
    Sauce.findOneAndUpdate({ _id: req.params.sauceId }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedSauce) => {
            res.status(200).json(updatedSauce);
        })
        .catch((err) => {
            res.status(500);
            return next(err);
        });
});

module.exports = sauceRouter;
