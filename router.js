const express = require('express');
const passportService = require('./config/passport');
const passport = require('passport');

const AuthenticationController = require('./controllers/authentication');
const QuizController = require('./controllers/quiz');
const UserController = require('./controllers/user');
const QuestionController = require('./controllers/question');
const AnswerController = require('./controllers/answer');

// Middleware to require login/auth
const requireAuth = (req, res, next) => passport.authenticate('jwt', { session: false }, function(err, user, info) {
  if (err) { return err; }
});
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const userRoutes = express.Router();
  const quizRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  //=========================
  // User Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/users', userRoutes);

  // User profile route
  userRoutes.get('/:userId', requireAuth(req, res, next), UserController.getUserProfile);

  //=========================
  // Quiz Routes
  //=========================

  // Set quiz routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/quiz', quizRoutes);

  // Get all quizzes
  quizRoutes.get('/', requireAuth, QuizController.getQuizzes);

  // Create new quiz
  quizRoutes.post('/', requireAuth, QuizController.createQuiz);

  // Get quiz by id
  quizRoutes.get('/:quizId', requireAuth, QuizController.getQuiz);

  // Delete quiz
  quizRoutes.delete('/:quizId', requireAuth, QuizController.deleteQuiz);

  // Update quiz
  quizRoutes.put('/:quizId', requireAuth, QuizController.updateQuiz);

  //=========================
  // Question Routes
  //=========================

  // Get all questions
  quizRoutes.get('/:quizId/questions', requireAuth, QuestionController.getQuestions);

  // Create new question
  quizRoutes.post('/:quizId/questions', requireAuth, QuestionController.createQuestion);

  // Get question
  quizRoutes.get('/:quizId/questions/:questionId', requireAuth, QuestionController.getQuestion);

  // Delete question
  quizRoutes.delete('/:quizId/questions/:questionId', requireAuth, QuestionController.deleteQuestion);

  // Update question
  quizRoutes.put('/:quizId/questions/:questionId', requireAuth, QuestionController.updateQuestion);

  //=========================
  // Answer Routes
  //=========================

  // Get all questions
  quizRoutes.get('/:quizId/questions/:questionId/answers', requireAuth, AnswerController.getAnswers);

  // Create new answer
  quizRoutes.post('/:quizId/questions/:questionId/answers', requireAuth, AnswerController.createAnswer);

  // Get answer
  quizRoutes.get('/:quizId/questions/:questionId/answers/:answerId', requireAuth, AnswerController.getAnswer);

  // Delete answer
  quizRoutes.delete('/:quizId/questions/:questionId/answers/:answerId', requireAuth, AnswerController.deleteAnswer);

  // Update answer
  quizRoutes.put('/:quizId/questions/:questionId/answers/:answerId', requireAuth, AnswerController.updateAnswer);

  //=========================
  // All Routes
  //=========================

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
