var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
    question: String,
    author: String,
    answers: [
        {
            answer: String,
            correctAnswer: Boolean
        }
    ]
});

module.exports = mongoose.model('Question', QuestionSchema);