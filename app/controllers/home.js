var Question = require('../models/questions');

var homeController= function(server){
	console.log("homeController listo 8000");
	server.route('/')
		.get(function(req,res){
			Question
				.find({})
				.populate('user')
				.limit(5)
				.sort('-created')
				.exec(function(err,questions){
					console.log(questions);
					if(req.user){
						var name = req.user._json.name;
						var url_foto = "http://graph.facebook.com/" + req.user.id + "/picture";
						res.render('home/index',{
							name:name,
							url_foto:url_foto,
							questions:questions
						});
					}else{
						res.render('home/index',{
							questions:questions
						});
					}
				});
		});
};
module.exports = homeController;