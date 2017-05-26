const Quiz = require('../models/quiz');
const Question = require('../models/question');
const Answer = require('../models/answer');

//========================================
// Get all answers
//========================================
exports.getAnswers = function(req, res, next) {
  Question.findById(req.params.questionId).populate('answers').exec(function(err, question) {
    if(err) throw err;

    if(question) {
      res.json(question.answers)
    } else {
      res.json({
        message: 'Answers not found!'
      });
    }
  });
};

//========================================
// Create answer
//========================================
exports.createAnswer = function(req, res, next) {
  var answer = new Answer({
    answerText: req.body.answerText,
    isCorrectAnswer: req.body.isCorrectAnswer
  });

  answer.save();

  Question.findById(req.params.questionId, function(err, question) {
    if (err) throw err;

    question.answers.push(answer);

    question.save(function(err) {
      if (err) throw err;

      res.json(answer);
    })
  });
};

//========================================
// Get answer
//========================================
exports.getAnswer = function(req, res, next) {
  Answer.findById(req.params.answerId, function(err, answer) {
    if (err) throw err;

    if(answer) {
      res.json(answer)
    } else {
      res.json({
        message: 'Answers not found!'
      });
    }
  });
};

//========================================
// Delete Answer
//========================================
exports.deleteAnswer = function(req, res, next) {
  // Answer.findByIdAndRemove(req.params.answerId, function(err, answer) {
  //   if (err) throw err;
  //
  //   if(answer) {
  //     res.json({
  //       message: 'Answer successfully deleted'
  //     });
  //   } else {
  //     res.json({
  //       message: 'Answer not found!'
  //     });
  //   }
  // });
  Question.findById(req.params.questionId, function(err, question){
    if (err) throw err;

    question.answers.pull({_id: req.params.answerId});
    question.save(function (err, updatedQuestion) {
      if (err) throw(err);
      res.json({
        message: 'Answer successfully deleted'
      });
    });
  })
};

//========================================
// Update Answer
//========================================
exports.updateAnswer = function(req, res, next) {
  Question.findOneAndUpdate({"_id": req.params.questionId, "answers._id": req.params.answerId}, {
    $set: {
      'answers.$.answerText': req.body.answerText
    }
  }, {
    new: true
  }, function(err, question) {
    if (err) throw err;

    res.json(question);
  });
  // Answer.findById(req.params.answerId, function (err, answer) {
  //   if (err) throw(err);
  //
  //   answer.answerText = req.body.answerText ? req.body.answerText : answer.answerText;
  //   //answer.isCorrectAnswer = req.body.isCorrectAnswer ? req.body.isCorrectAnswer : answer.isCorrectAnswer;
  //
  //   answer.save(function (err, updatedAnswer) {
  //     if (err) throw(err);
  //     res.json(updatedAnswer);
  //   });
  // });
  // Question.findById(req.params.questionId, function(err, question) {
  //   console.log(req.params.answerId, req.body.answerText)
  //   question.update({'answers._id': req.params.answerId}, {
  //     '$set': {
  //       'answers.$.answerText': req.body.answerText
  //     }
  //   }, function(err) {
  //     question.save(function (err, updatedQuestion) {
  //       if (err) throw(err);
  //       res.json(updatedQuestion);
  //     });
  //   });
  // });
  // Question.update({"_id": req.params.questionId, "answers._id": req.params.answerId}, {
  //   $set: {
  //     "answers.$.answerText": req.body.answerText
  //   }
  // }, function(err) {
  //   if (err) throw(err);
  //   res.json({message: "Question Updated"});
  // });

};



