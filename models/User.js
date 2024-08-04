const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    memberSince: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

// userSchema.pre("save", function(next){
//     const user = this
//     if(!user.isModified("password")) return next()
//     bcrypt.hash(user.password, 10, (err, hash) => {
//         if(err) return next(err)
//         user.password = hash
//     })
// })
userSchema.pre('validate', function (next) {
    const user = this;
    const password = user.password;
    const email = user.email;
    console.log(user);
    if (!validator.isStrongPassword(password)) {
        return next(new Error('Password must contain upper and lowercase letter, number, and special character.'));
    }
    if (!validator.isEmail(email)) {
        return next(new Error("Please provide a valid email address."));
    }
    next();
});

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.withoutPassword = function ()  {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)

