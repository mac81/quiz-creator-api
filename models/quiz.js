var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
  name: String,
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  live: { type: Boolean, default: false },
  questions: [
    {
      type: Schema.ObjectId,
      ref: 'Question'
    }
  ]
});

module.exports = mongoose.model('Quiz', QuizSchema);