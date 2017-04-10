var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
  name: String,
  questions: [
    {
      type: Schema.ObjectId,
      ref: 'Question'
    }
  ]
});

module.exports = mongoose.model('Quiz', QuizSchema);