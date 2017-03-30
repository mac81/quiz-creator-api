var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
    question: String,
    correctAnswerId: String,
    answers: [
        {
            answer: String
        }
    ]
});

module.exports = mongoose.model('Question', QuestionSchema);