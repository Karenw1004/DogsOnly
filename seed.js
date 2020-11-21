var mongoose = require("mongoose");
var Dog = require("./models/dog");
var Comment   = require("./models/comment");
 
async function seedDB(){
	await Dog.deleteMany({});
	console.log("dog removed");
	await Comment.deleteMany({});
	console.log("comments removed");
	
	for (const seed of seeds){
		let dog = await Dog.create(seed);
		console.log("dog create");
		let comment = await Comment.create(
			 {
				text: "This place is great, but I wish there was internet",
				author:{
                 	id : "588c2e092403d111454fff76",
                 	username: "Jack"
                }
			 }
		);
		console.log("dog create");
		dog.comments.push(comment);
		dog.save();
		console.log("comment added to dog");
	}
} 
 
var seeds = [
    {
        title: "Dog0", 
		author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        },
        image: "https://vcahospitals.com/-/media/vca/images/lifelearn-images-foldered/9649/obese_dog.png?la=en&hash=B5FD814C82ADA4C17032947F4A767679",
        description: "Lorem ipsum dolor sit amet, possit epicurei nominati te vel, quodsi recteque laboramus an sed, eu quo duis salutatus voluptaria. Quod tation et usu, pro soleat interpretaris concludaturque in, ei minim nusquam sit. Ut nec blandit mentitum, pri ex partem dictas utamur. Dolor veniam utroque mel ne, pri dolore latine ei, id has eirmod iisque. Eu has dictas detracto maluisset. Id eam nonumy intellegam.Mel partem albucius et. Nec quis dicant ei, pri in mutat saperet expetendis. An nec habeo assum adipiscing. Stet docendi oporteat et his. No vim facilis dissentiet theophrastus. Habeo partem et vim, id quo hinc appareat.Vim elitr timeam ea, in nec electram eloquentiam appellantur. Vide altera iudicabit mei cu, deserunt democritum deterruisset nec ne, ex enim sanctus honestatis sea. At dictas postulant contentiones vim, quas solet docendi nec te. Ad cum civibus consectetuer. Cu dicant delectus salutatus vix, duo in iusto fabellas.An tale ceteros reprehendunt sit. Qui no albucius dissentias sadipscing, etiam placerat philosophia nam ad, vocent contentiones duo ex. Eum ea vidisse voluptua suscipiantur, idque clita ei vel. Est semper principes dissentiunt id, ne tamquam eruditi intellegebat per.Vide scribentur at usu. Quaestio scriptorem an qui, iisque adipisci cu pro. Minim recusabo dissentias vis no, ad atqui scribentur contentiones eum. Ne impetus laboramus vix. Epicurei probatus te nam, eum iusto ludus solet ea."
		
    },
    {
        title: "Dog1",
		author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        },
        image: "https://westvalleyhumanesociety.org/wp-content/uploads/2019/09/3.jpg",
        description: "Lorem ipsum dolor sit amet, possit epicurei nominati te vel, quodsi recteque laboramus an sed, eu quo duis salutatus voluptaria. Quod tation et usu, pro soleat interpretaris concludaturque in, ei minim nusquam sit. Ut nec blandit mentitum, pri ex partem dictas utamur. Dolor veniam utroque mel ne, pri dolore latine ei, id has eirmod iisque. Eu has dictas detracto maluisset. Id eam nonumy intellegam.Mel partem albucius et. Nec quis dicant ei, pri in mutat saperet expetendis. An nec habeo assum adipiscing. Stet docendi oporteat et his. No vim facilis dissentiet theophrastus. Habeo partem et vim, id quo hinc appareat.Vim elitr timeam ea, in nec electram eloquentiam appellantur. Vide altera iudicabit mei cu, deserunt democritum deterruisset nec ne, ex enim sanctus honestatis sea. At dictas postulant contentiones vim, quas solet docendi nec te. Ad cum civibus consectetuer. Cu dicant delectus salutatus vix, duo in iusto fabellas.An tale ceteros reprehendunt sit. Qui no albucius dissentias sadipscing, etiam placerat philosophia nam ad, vocent contentiones duo ex. Eum ea vidisse voluptua suscipiantur, idque clita ei vel. Est semper principes dissentiunt id, ne tamquam eruditi intellegebat per.Vide scribentur at usu. Quaestio scriptorem an qui, iisque adipisci cu pro. Minim recusabo dissentias vis no, ad atqui scribentur contentiones eum. Ne impetus laboramus vix. Epicurei probatus te nam, eum iusto ludus solet ea."
    },
    {
        title: "Dog2", 
		 author:{
            id : "588c2e092403d111454fff77",
            username: "Jane"
        },
        image: "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2019/04/931/524/white-pomeranian-dog-istock.jpg?ve=1&tl=1",
        description: "Lorem ipsum dolor sit amet, possit epicurei nominati te vel, quodsi recteque laboramus an sed, eu quo duis salutatus voluptaria. Quod tation et usu, pro soleat interpretaris concludaturque in, ei minim nusquam sit. Ut nec blandit mentitum, pri ex partem dictas utamur. Dolor veniam utroque mel ne, pri dolore latine ei, id has eirmod iisque. Eu has dictas detracto maluisset. Id eam nonumy intellegam.Mel partem albucius et. Nec quis dicant ei, pri in mutat saperet expetendis. An nec habeo assum adipiscing. Stet docendi oporteat et his. No vim facilis dissentiet theophrastus. Habeo partem et vim, id quo hinc appareat.Vim elitr timeam ea, in nec electram eloquentiam appellantur. Vide altera iudicabit mei cu, deserunt democritum deterruisset nec ne, ex enim sanctus honestatis sea. At dictas postulant contentiones vim, quas solet docendi nec te. Ad cum civibus consectetuer. Cu dicant delectus salutatus vix, duo in iusto fabellas.An tale ceteros reprehendunt sit. Qui no albucius dissentias sadipscing, etiam placerat philosophia nam ad, vocent contentiones duo ex. Eum ea vidisse voluptua suscipiantur, idque clita ei vel. Est semper principes dissentiunt id, ne tamquam eruditi intellegebat per.Vide scribentur at usu. Quaestio scriptorem an qui, iisque adipisci cu pro. Minim recusabo dissentias vis no, ad atqui scribentur contentiones eum. Ne impetus laboramus vix. Epicurei probatus te nam, eum iusto ludus solet ea."
    }
];
 

 
module.exports = seedDB;