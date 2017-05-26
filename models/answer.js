var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  answerText: String
  //isCorrectAnswer: { type: Boolean, default: false }
});

module.exports = mongoose.model('Answer', AnswerSchema);