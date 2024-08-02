const express = require('express');
const sauceRouter = express.Router();
const axios = require('axios');

const Sauce = require('../models/Sauce.js'); //

//app.use('/api/sauce', require('./routes/sauceRouter.js'))

//GET all sauces, regardless of user

//THIS WORKS!  ON THE BACK END ANYWAY
sauceRouter.get('/', (request, response, next) => {
    Sauce.find()
        .exec()
        .then((sauces) => {
            console.log(response.data);
            return response.status(200).send(sauces);
        })
        .catch((error) => {
            response.status(500);
            return next(error);
        });
});

sauceRouter.get('/random', (req, res, next) => {
    Sauce.find()
        .exec()
        .then((sauces) => {
            if (sauces.length === 0) {
                return res.status(404).send('No sauces found');
            }
            const randomIndex = Math.floor(Math.random() * sauces.length);
            const randomSauce = sauces[randomIndex];
            return res.status(200).send(randomSauce);
        })
        .catch((error) => {
            res.status(500);
            return next(error);
        });
});

//this one works, thank god
// sauceRouter.get('/:sauceId', (req, res, next) => {
//     Sauce.find({_id: req.params.sauceId })
//     .then((sauce) => {
//         res.status(200).send(sauce);
//     })
//     .catch((err) => {
//         res.status(500);
//         next(err);
//     });
// });

///fixed this route
sauceRouter.get('/user', (req, res, next) => {
    Sauce.find({ user: req.auth._id })
        .then((sauces) => {
            res.status(200).send(sauces);
        })
        .catch((err) => {
            res.status(500);
            next(err);
        });
});

// POST(add one); remember this goes throught the sauces.js and server.js(middleware) so have the correct name in postman --- http://localhost:8100/sauces/

//THIS ONE WORKS NOW TOO
sauceRouter.post('/', (req, res, next) => {
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
sauceRouter.delete('/:sauceId', (req, res, next) => {
    Sauce.findOneAndDelete({ _id: req.params.sauceId })
        .exec()
        .then((deletedSauce) => {
            if (!deletedSauce) {
                return res.status(404).send('Sauce not found');
            }
            return res.status(200).send('Sauce deleted');
        })
        .catch((error) => {
            res.status(500);
            return next(error);
        });
});

//UPDATE one
sauceRouter.put('/:sauceId', (req, res, next) => {
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
