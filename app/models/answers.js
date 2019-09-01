var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    
    question : { type : Schema.Types.ObjectId, ref : 'question' },//actrar como una llave foranea
    user : { type : Schema.Types.ObjectId, ref : 'user' },
    content : { type: String },
    created : {type: Date, default: Date.now}
    
});

var Answer = mongoose.model('answer', answerSchema);

module.exports = Answer;
