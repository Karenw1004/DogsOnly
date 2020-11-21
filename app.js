const express = require("express"),
	app = express(),
	bodyParser = require ('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	methodOverride = require('method-override'),
	flash = require('connect-flash'),
	seedDB = require('./seed');

const KerasJS = require('keras-js');
//models
const User = require("./models/user");
const Dog = require("./models/dog")

var url = "mongodb+srv://test:test@dogsonly.ecynm.mongodb.net/dogsOnly?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true, useCreateIndex: true,}).then(() => {
	console.log('Dogs Only : connected to DB');
}).catch( err => {
	console.log('ERROR is:', err.message);
});

//CONFIGURATION FIRST BEFORE DEFNING ROUTES
app.use(bodyParser.urlencoded( {extended: true}));
app.set("view engine", "ejs");
//PASSPORT CONFIGURATION
app.use(require("express-session") ({
	secret: "lol",
	resave: false,
	saveUninitialized: false
}));
app.use(flash()); //HAS TO BE AFTER PASSPORT CONFIG AND REQUIRE SESSIONS


seedDB();

//to authenticate passport
app.use(passport.initialize());
app.use(passport.session());

//plugins from passportLocalMongoose in user.js file
passport.use(new LocalStrategy(User.authenticate()));
//2.encoding it and putting it back to the session
passport.serializeUser(User.serializeUser());
//1.responsible for reading the session and taking the data from the session
// that's encoded and uncoding it
passport.deserializeUser(User.deserializeUser());

app.use( (req,res,next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

//Requiring Routes
const indexRoutes = require("./routes/index");
app.use(indexRoutes);
const dogRoutes = require("./routes/dogs");
app.use("/dogs",dogRoutes);


// LISTEN ROUTE
app.listen(process.env.PORT || 3000, ()=> {
	console.log("DOGSONLY IS RUNNING");
});
