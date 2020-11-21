const mongoose = require('mongoose');

//Dog Schema
const dogSchema = new mongoose.Schema( {
	title: String,
	image: String,
	//author for adding new campgrounding 
	author: {
		id: {
			type : mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
	
});

var Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;