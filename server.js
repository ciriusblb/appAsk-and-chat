var express=require('express'),
	http = require('http'),
	swig = require('swig'),
	passport = require('passport'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');//para hacer peticiones post


var server = express();
var server_socket=http.createServer(server).listen(8000);
var io = require('socket.io').listen(server_socket);



swig.setDefaults({cache:false});
// configurar express para que use sesiones
server.use(bodyParser.urlencoded({
	extended: true
}));


server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({secret:'mi clave'}));



// configuración inicial de passport
server.use(passport.initialize());
server.use(passport.session());



// serializar la sesión del usuario cuando llega una petición de autentificación
passport.serializeUser(function(user, done) {
    done(null, user); // req.user
});
passport.deserializeUser(function(user, done) {
    done(null, user); // req.user
});



//config swig
server.engine('html', swig.renderFile);//motor de html y swig renderiza los archivos
server.set('view engine', 'html');//motor de vistas html
server.set('views', __dirname+'/app/views');//donde estaran alojados los archivos html, dirname devuelve la ruta del proyecto



server.use(express.static('./public'));//la caréta public aloja archivos estaticos



//controller
require('./app/controllers/home')(server);
// require('./app/controllers/user')(server,io);
require('./app/controllers/user')(server);
require('./app/controllers/discuss')(server,io);



// conexiones
require('./app/connections/facebook')(server);
