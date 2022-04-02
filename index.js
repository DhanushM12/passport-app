if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}



const express = require('express');
const app = express();
const port = 8000;
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const users = [];

const initialize = require('./config/passportlocal');
initialize(passport, 
    email => users.find(user => user.email == email),
    id => users.find(user => user.id == id)
    );

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    return res.redirect('/login')
}


function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}
app.listen(port, function(err){
    if(err){
        console.log(`Error i running the server : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`)
})