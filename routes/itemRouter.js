const express = require('express');
const itemRouter = express.Router();
const Sauce = require('../models/Sauce.js'); //

// app.use('api/item', require('./routes/itemRouter.js'))

//endpoint is api/item instead of api/sauce

itemRouter.get('/:sauceId', async (req, res, next) => {
    try {
        const foundOneSauce = await Sauce.findOne({ _id: req.params.sauceId });

        if (!foundOneSauce) {
            return res.status(404).send('Sauce not found');
        }
        return res.status(200).send(foundOneSauce);
    } catch (err) {
        res.status(500).send('Internal server error');
        next(err);
    }
});

module.exports = itemRouter;
