var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
  name: String,
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now },
  questions: [
    {
      type: Schema.ObjectId,
      ref: 'Question'
    }
  ]
});

module.exports = mongoose.model('Quiz', QuizSchema);