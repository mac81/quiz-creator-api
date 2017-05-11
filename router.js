const express = require('express');
const passportService = require('./config/passport');
const passport = require('passport');

const AuthenticationController = require('./controllers/authentication');
const QuizController = require('./controllers/quiz');
const UserController = require('./controllers/user');
const QuestionController = require('./controllers/question');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const userRoutes = express.Router();
  const quizRoutes = express.Router();
  const questionRoutes = express.Router();

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
  userRoutes.get('/:userId', requireAuth, UserController.getUserProfile);

  //=========================
  // Quiz Routes
  //=========================

  // Set quiz routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/quiz', quizRoutes);

  // Create new quiz
  quizRoutes.post('/', requireAuth, QuizController.createQuiz);

  // Get all quizzes
  quizRoutes.get('/', requireAuth, QuizController.getQuizzes);

  // Get quiz by id
  quizRoutes.get('/:quizId', requireAuth, QuizController.getQuiz);

  // Delete quiz
  quizRoutes.delete('/:quizId', requireAuth, QuizController.deleteQuiz);

  // Get quiz questions
  quizRoutes.get('/:quizId/questions', requireAuth, QuizController.getQuizQuestions);

  // Create new quiz question
  quizRoutes.post('/:quizId/questions', requireAuth, QuizController.createQuizQuestion);

  //=========================
  // Question Routes
  //=========================

  apiRoutes.use('/questions', questionRoutes);

  // Get question
  questionRoutes.get('/:questionId', requireAuth, QuestionController.getQuestion);

  // Delete question
  questionRoutes.delete('/:questionId', requireAuth, QuestionController.deleteQuestion);

  // Update question
  questionRoutes.put('/:questionId', requireAuth, QuestionController.updateQuestion);


  // Set url for API group routes
  app.use('/api', apiRoutes);
};
