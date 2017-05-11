const Quiz = require('../models/quiz');
const Question = require('../models/question');

//========================================
// Get Question
//========================================
exports.getQuestion = function(req, res, next) {
  Question.findById(req.params.questionId, function(err, question) {
    if (err) { return next(err); }

    if(question) {
      res.json(question);
    } else {
      res.json({
        message: 'Question not found!'
      });
    }
  });
};

//========================================
// Delete Question
//========================================
exports.deleteQuestion = function(req, res, next) {
  Question.findByIdAndRemove(req.params.questionId, function(err, question) {
    if (err) throw err;

    if(question) {
      res.json({
        message: 'Question successfully deleted'
      });
    } else {
      res.json({
        message: 'Question not found!'
      });
    }
  });
};

//========================================
// Update Question
//========================================
exports.updateQuestion = function(req, res, next) {
  Question.findByIdAndUpdate(req.params.questionId, {
    questionText: req.body.questionText
  }, {
    new: true
  },function(err, question) {
    if (err) throw err;

    res.json(question);
  });
};





