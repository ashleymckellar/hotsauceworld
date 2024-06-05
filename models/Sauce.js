const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sauceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    heatRating: {
        type: Number,
    },
    origin: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ingredients: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // comments: [commentSchema]

    comments: {
        type: Array,
        default: [],
    },
});



module.exports = mongoose.model("Sauce", sauceSchema);
