var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;//para crear esquema

var userSchema = new Schema({
    //esquema de la coleccion
    id_network : {type: String},
    username : {type: String, required: true, index: {unique: true}},
    email: {type: String, required: true},
    first_name: {type: String},
    url_foto:{type:String}
    
});
//modelo para el esquema
//sobre la variable User se hará todas las modificaciones del model como guardar editar eliminar
var User = mongoose.model('user', userSchema);
//'user' nombre del esquema 

module.exports = User;