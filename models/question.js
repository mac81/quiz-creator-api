var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  questionText: String,
  label: String,
  nodeId: Number,
  answers: [
    {
      type: Schema.ObjectId,
      ref: 'Answer'
    }
  ]
});

// QuestionSchema.statics.getQuestions = function(callback){
//   this.find({})
//     .select('questionText')
//     .exec(callback);
// };

// QuestionSchema.statics.getQuestionsByOrder = function(callback) {
//   this.find({}).sort('order').exec(callback);
// };

module.exports = mongoose.model('Question', QuestionSchema);