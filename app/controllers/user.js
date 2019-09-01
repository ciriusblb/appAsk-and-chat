var User = require('../models/user'),
    logged=require('../middlewares/logged'),
    getUser = require('../middlewares/getUser');
// var userController = function(server,io){
var userController = function(server){

	// var io2 = io.of('/chat');
	// io2.on('connection',function(socket){
	// 	socket.join('chat');
	// 	socket.on('nuevo usuario',function(data){//broadcast evento de envio de mensaje, envia el mensaje a los usuario qu esten dentro del cuarto y no a el mismo
	// 		socket.broadcast.to('chat').emit('devolviendo usuario',data);
	// 	});
	// 	socket.on('nuevo mensaje',function(data){
	// 		io2.to('chat').emit('devolviendo mensaje',data);
	// 	});

	// });

	// server.route('/chat')
	// 	.get(logged, getUser,function(req,res){
	// 		var user={
	// 			username:req.user.username,
	// 			url_foto:req.user.url_foto
	// 		}
	// 		users.push(user);
	// 		res.render('user/chat',{users:users, user:req.user.username,url_foto:req.user.url_foto});
	// 	});


	server.route('/logout')
		.get(getUser,function(req,res){
			// users=users.filter(function(el){
			// 	return el.username!==req.user.username;
			// });
			// io2.in('chat').emit('logout',req.user);
			req.logout();
			res.redirect('/');
		});
	server.route('/extra-data')
		.get(function(req,res){
			User.findOne({id_network:req.user.id},function(err,user){
				if(user){
					res.redirect('/');
					return;
				}else{
					res.render('user/extra-data');	
				}
			});	
		})
		.post(function(req,res){
			var user = new User({
				id_network:req.user.id,
				username: req.body.username,
				email:req.body.email,
				first_name:req.user.displayName,
				url_foto:"http://graph.facebook.com/" + req.user.id + "/picture"
			});
			user.save(function(err){
				if(err){
					console.log("error");
					return;
				}
			});
			res.redirect('/');
		});
};
module.exports=userController;