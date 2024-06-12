const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan"); 
const mongoose = require("mongoose");
const path = require('path');
const { expressjwt } = require("express-jwt"); 
process.env.SECRET;
const PORT = process.env.PORT || 8100;
const uri = process.env.URI


app.use(express.json());
app.use(morgan('dev')); 


async function connectToDb() {
    try {
        await mongoose.connect(uri);
        console.log('connected to DB');
    } catch (err) {
        console.log(err);
    }
}

connectToDb()

    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
          res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
          next();
        }
      });
      
      // Serve static files from the React app
      app.use(express.static(path.join(__dirname, 'client/build')));

// app.use(
//     session({
//         secret: process.env.SECRET,
//         resave: true,
//         saveUninitialized: true,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );
// app.get(
//     "/auth/google/callback",
//     passport.authenticate("google", { failureRedirect: "/" }),
//     (req, res) => {
//         // Redirect after successful authentication
//         res.redirect("/dashboard");
//     }
// );
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
//   });


app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//middleware

app.use('/api', expressjwt( { secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/auth', require ('./routes/authRouter.js'))
app.use('/api/sauce', require('./routes/sauceRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))
app.use('/api/item', require('./routes/itemRouter.js'))



//Error handler/s
app.use((err, req, res, next) => { 
    console.log(err)
    if(err.name ==="UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})



app.listen(PORT, () => {
    console.log(`The server is running on Port ${PORT}`)
})
