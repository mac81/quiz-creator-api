var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  questionText: String,
  correctAnswerId: String,
  answers: [
    {
      answerText: String
    }
  ]
});

QuestionSchema.statics.getQuestions = function(callback){
  this.find({})
    .select('questionText')
    .exec(callback);
};

module.exports = mongoose.model('Question', QuestionSchema);