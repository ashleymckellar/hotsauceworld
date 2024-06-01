const express = require("express");
const itemRouter = express.Router();
const Sauce = require("../models/Sauce.js"); //

// app.use('api/item', require('./routes/itemRouter.js'))


//endpoint is api/item instead of api/sauce



itemRouter.get('/:sauceId', (req, res, next) => {
    
    Sauce.findOne({_id: req.params.sauceId })
    .then((sauce) => {
        if (!sauce) {
            return res.status(404).send("Sauce not found");
        }
        res.status(200).send(sauce);
    })
    .catch((err) => {
        res.status(500).send("Internal server error");
        next(err);
    });
});


module.exports = itemRouter