const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    sauce: {
        type: Schema.Types.ObjectId,
        ref: "Sauce",
        required: false
    }, 
    createdAt: {
        type: Date,
        required: false
    }

})



module.exports = mongoose.model("Comment", commentSchema)