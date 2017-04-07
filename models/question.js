var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  questionText: String,
  answers: [
    {
      type: Schema.ObjectId,
      ref: 'Answer'
    }
  ]
});

QuestionSchema.statics.getQuestions = function(callback){
  this.find({})
    .select('questionText')
    .exec(callback);
};

module.exports = mongoose.model('Question', QuestionSchema);