const Quiz = require('../models/quiz');
const Question = require('../models/question');

//========================================
// Create Quiz
//========================================
exports.createQuiz = function(req, res, next) {
  var quiz = new Quiz({
    name: req.body.name,
    creator: req.user
  });

  quiz.save(function (err) {
    if (err) { return next(err); }

    res.status(201).json({
      message: 'Quiz created!',
      payload: quiz
    });
  });
};

//========================================
// Get all Quizzes
//========================================
exports.getQuizzes = function(req, res, next) {
  const query = Quiz.find({});
  query.where('creator', req.user._id);
  query.exec(function (err, docs) {

    if (err) { return next(err); }

    res.status(201).json({
      message: 'Success',
      payload: docs
    });
  });
};

//========================================
// Get Quiz by id
//========================================
exports.getQuiz = function(req, res, next) {

  Quiz.findById(req.params.quizId, function(err, quiz) {
    if (err) { return next(err); }

    if(quiz) {
      res.json(quiz);
    } else {
      res.json({
        message: 'Quiz not found!'
      });
    }
  });
};

//========================================
// Delete Quiz
//========================================
exports.deleteQuiz = function(req, res, next) {
  Quiz.findByIdAndRemove(req.params.quizId, function(err, quiz) {
    if (err) { return next(err); }

    if(quiz) {
      res.json({
        message: 'Quiz successfully deleted'
      });
    } else {
      res.json({
        message: 'Quiz not found!'
      });
    }
  });
};

//========================================
// Update Quiz
//========================================
exports.updateQuiz = function(req, res, next) {
  Quiz.findById(req.params.quizId, function(err, quiz) {
    if (err) { return next(err); }

    res.json({
      message: 'TODO: update quiz'
    });

  });
};





