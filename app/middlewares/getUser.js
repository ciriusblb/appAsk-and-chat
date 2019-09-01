var User = require('../models/user');

var getUserMiddleware = function(req,res,next){
	User.findOne({id_network: req.user.id},function(err,user){
		req.user=user;
		next();
	});
};
module.exports=getUserMiddleware;