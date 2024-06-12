const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/Comment.js');
const User = require('../models/User.js');
const Sauce = require('../models/Sauce.js');

//app.use('/api/comment', require('./routes/commentRouter.js'))

commentRouter.post('/:sauceId', async (req, res, next) => {
    try {
        req.body.user = req.auth._id;
        const newComment = new Comment(req.body);
        newComment.save();
        const foundSauce = await Sauce.findById({ _id: req.params.sauceId });
        console.log(foundSauce);
        foundSauce.comments.push(newComment);
        foundSauce.save();
        res.status(200).send(foundSauce);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: err });
    }
});



commentRouter.get('/:sauceId', async (req, res, next) => {
    try {
        const foundSauce = await Sauce.findById({ _id: req.params.sauceId });

        return res.status(200).send(foundSauce.comments);
    } catch (err) {
        res.status(500);
        return next(err);
    }
});



module.exports = commentRouter;
