const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/Comment.js");
const User = require("../models/User.js");
const Sauce = require("../models/Sauce.js");

//app.use('/api/comment', require('./routes/commentRouter.js'))

commentRouter.post("/:sauceId", async (req, res, next) => {
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

// commentRouter.get("/:sauceId", (req, res, next) => {
//     Comment.find( { sauce: req.params.sauceId }, (err, comments) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(comments)
//     })
// })

commentRouter.get("/:sauceId", (req, res, next) => {
    console.log(req.params.sauceId);
    Sauce.findById({ _id: req.params.sauceId })
        .then((sauce) => {
            // if (!comments) {
            //     res.status(404).send("No comments found for this sauce.");
            // } else {
            //     res.status(200).send(comments);
            // }
            console.log(sauce);
            res.status(200).send(sauce.comments);
        })
        .catch((err) => {
            res.status(500);
            return next(err);
        });
});

// sauceRouter.get("/user", (req, res, next) => {
//     Sauce.find({ user: req.auth._id })
//         .then((sauces) => {
//             res.status(200).send(sauces)
//         })
//         .catch((err) => {
//             res.status(500)
//             next(err)
//         })
//     })

module.exports = commentRouter;
