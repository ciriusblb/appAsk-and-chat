var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;//develve estrategia par autentificar con faccebook

var facebookConnection = function(server) {
    passport.use(new FacebookStrategy({//utiliza estrtegia
        clientID : '1979412295673305',
        clientSecret : 'ea7eca3e32f5d98e78acf93877b69d2c',
        callbackURL : 'http://localhost:8000/auth/facebook/callback'
    }, function(accessToken, RefreshToken, profile, done) {
        done(null, profile);//variable donde estan todos los datos de la persona logueada con facebook 
    }));
    //url para loguear con facebook 
    server.get('/auth/facebook', passport.authenticate('facebook'));
    
    server.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/extra-data', 
        failureRedirect : '/error'
    }));
    
};

module.exports = facebookConnection;
