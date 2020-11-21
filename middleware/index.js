//all middleware goes here
var Dog = require("../models/dog");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkDogOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Dog.findById(req.params.id, function(err, foundDog){
           if(err || !foundDog){
			   req.flash("error",  "Dog not found");
               res.redirect("back");
           }  else {
               // does user own the Dog?
            if(foundDog.author.id.equals(req.user._id)) {
                next();
            } else {
				req.flash("error",  "Permission denied");
                res.redirect("back");
            }
           }
        });
    } else {
		req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundDog){
			   req.flash("error",  "Comment not found");
               res.redirect("back");
           }  else {
               // does user own the comment?
			   // is a mongoose object console.log(foundComment.author.id);
			//is a string console.log(req.user._id);
			// if (foundComment.author.id === req.user._id) use the below
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error",  "Permission denied");
					res.redirect("back");
				}
           }
        });
    } else {
		req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;