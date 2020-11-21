const express = require("express");
const router 	= express.Router();
const passport = require("passport");

//models
const User = require("../models/user.js");

//root route
router.get("/",(req,res) => {
	//showing views/main.ejs (no need ejs bcs we app.set())
	res.render("main");
});



//SHOW REGISTER FORM
router.get("/signup", (req,res) => {
	res.render("signup");
});
//HANDLE LOGIC FOR REGISTER FORM
router.post("/signup" , (req,res) => {
	const newUser = new User ({username: req.body.username});
	User.register(newUser, req.body.password, (err,user) => {
		//show error message when user is already FOUND in db
		if (err){
			req.flash("error", err.message);
			res.redirect("signup");
		} 
		
			passport.authenticate("local")(req,res, () => {
			//if not user.username, req.body.username is also o k
			// user.username in case data got changed in the db
			req.flash("success" , "Welcome to DOGSONLY" + user.username);
			//changed redirect to render
			res.redirect("/dogs");
			});
		
		
	});
});


//SHOW LOGIN FORM
router.get("/login",(req,res) => {
	res.render("login");
});


router.post("/login", passport.authenticate("local" , { 
	successRedirect: "/dogs",
    failureRedirect: "/login",
    }), (req, res) => {}
);

//LOGOUT
router.get("/logout" ,(req,res) => {
	req.logout();
	// req.flash("success" , "Logout Success!");
	res.redirect("/");
});

// //INDEX - show all campgrounds
// router.get("/projects",(req,res) => {
// 	Post.find({}, (err,allPost) => {
// 		 if(err){
//            console.log(err);
//        	} else {
//           res.render("projects", {Post: allPost});
// 		}
// 	});
	
// });



module.exports = router