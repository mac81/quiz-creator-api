var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  answerText: String,
  isCorrectAnswer: Boolean
});

module.exports = mongoose.model('Answer', AnswerSchema);