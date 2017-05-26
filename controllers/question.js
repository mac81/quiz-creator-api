const Quiz = require('../models/quiz');
const Question = require('../models/question');

//========================================
// Get Quiz questions
//========================================
exports.getQuestions = function(req, res, next) {
  Quiz.findById(req.params.quizId).populate('questions', 'questionText label nodeId').exec(function(err, quiz) {
    if (err) { return next(err); }

    if(quiz) {
      res.json(quiz.questions);
    } else {
      res.json({
        message: 'Quiz questions not found!'
      });
    }
  });
};

//========================================
// Create Quiz question
//========================================
exports.createQuestion = function(req, res, next) {
  var question = new Question({
    questionText: req.body.questionText
  });

  Question.count({}, function(err, count) {
    question.label = `q${count + 1}`;
    question.nodeId = count + 1;

    question.save(function (err) {
      if (err) throw err;
    });
  });

  const position = req.body.insertPosition === 'before' ? req.body.position : req.body.position + 1;

  Quiz.findByIdAndUpdate(req.params.quizId, {
    $push: {
      questions: {
        $each: [
          question
        ],
        $position: position
      }
    }
  },{
    new: true
  }, function(err) {
    if (err) throw err;

    res.json({
      message: 'Question created!',
      payload: question
    });
  });
};

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
  // Question.findByIdAndRemove(req.params.questionId, function(err, question) {
  //   if (err) throw err;
  //
  //   if(question) {
  //     res.json({
  //       message: 'Question successfully deleted'
  //     });
  //   } else {
  //     res.json({
  //       message: 'Question not found!'
  //     });
  //   }
  // });
  Quiz.findById(req.params.quizId, function(err, quiz){
    if (err) throw err;

    quiz.questions.pull({_id: req.params.questionId});
    quiz.save(function (err, updatedQuiz) {
      if (err) throw(err);
      res.json({
        message: 'Question successfully deleted'
      });
    });
  })
};

//========================================
// Update Question
//========================================
exports.updateQuestion = function(req, res, next) {
  // Question.findByIdAndUpdate(req.params.questionId, {
  //   questionText: req.body.questionText
  // }, {
  //   new: true
  // },function(err, question) {
  //   if (err) throw err;
  //
  //   // Quiz.findById(req.params.quizId, function(err, quiz) {
  //   //   if (err) { return next(err); }
  //   //
  //   //   res.json(question);
  //   // });
  //
  //   res.json(question);
  // });

  Question.findById(req.params.questionId, function (err, question) {
    if (err) throw(err);

    question.questionText = req.body.questionText ? req.body.questionText : question.questionText;
    question.correctAnswer = req.body.correctAnswer ? req.body.correctAnswer : question.correctAnswer;

    question.save(function (err, updatedQuestion) {
      if (err) throw(err);
      res.json(updatedQuestion);
    });
  });
};





