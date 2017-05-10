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
// Get Quiz questions
//========================================
exports.getQuizQuestions = function(req, res, next) {
  Quiz.findById(req.params.quizId).populate('questions').exec(function(err, quiz) {
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
exports.createQuizQuestion = function(req, res, next) {
  var question = new Question({
    questionText: req.body.questionText
  });

  Question.count({}, function(err, count) {
    question.label = `q${count + 1}`;
    question.nodeId = count + 1;

    // if(req.body.answers) {
    //   req.body.answers.forEach(function(answer) {
    //     var answer = new Answer({
    //       answerText: answer.answerText,
    //       isCorrectAnswer: answer.isCorrectAnswer
    //     });
    //     answer.save();
    //     question.answers.push(answer);
    //   });
    // }

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


