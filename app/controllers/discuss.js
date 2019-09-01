var Question = require('../models/questions');
var Answer = require('../models/answers');
var User = require('../models/user'),
    logged=require('../middlewares/logged'),
    getUser = require('../middlewares/getUser'),
    slugs = require('slugs');

var discussController = function(server,io) 
{
    io.on('connection',function(socket){
        socket.join('home');//nombre del cuarto
    });
    server.route('/guardar-pregunta')
        .post(logged,getUser,function(req, res) {         
            var question = new Question({
                user : req.user, 
                title : req.body.titulo,
                content : req.body.contenido,
                slug:slugs(req.body.titulo)
            });
            
            question.save(function(err) {
                if (err) {
                    console.log('error');
                    return;
                }
                io.to('home').emit('preguntando',{
                    username:req.user.username,
                    url_foto:req.user.url_foto,
                    content:req.body.contenido,
                    created:question.created
                });
            });
            res.redirect('/');
        });
    server.route('/pregunta/:slug')
        .get(logged,getUser,function(req,res){
            Question
            .findOne({slug:req.params.slug})
            .populate('user')
            .exec(function(err,question){
                Answer
                .find({question:question})
                .populate('user')
                .sort('created')
                .exec(function(err,answers){
                    res.render('discuss/question_detail',{
                        question:question,
                        answers:answers
                    });
                });
            });
        })
        .post(logged,getUser,function(req,res){
            Question
            .findOne({slug:req.params.slug})
            .populate('user')
            .exec(function(err,question){
                var answer = new Answer({
                    question:question,
                    user:req.user,
                    content:req.body.contenido
                });
                answer.save(function(err){
                    if (err) {
                        console.log('error');
                        return;
                    }
                });
                res.redirect('/pregunta/'+req.params.slug);
            });
           
        });
}

module.exports = discussController;