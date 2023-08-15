const express = require("express");

const UserController = require("../controllers/userController");
const QuestionController = require("../controllers/questionController");
const TypeController = require("../controllers/typeController");
const authentication = require("../middlewares/authentication");
const { loginLimiter, questionLimiter } = require("../middlewares/rateLimiter");
const {
  authorizationCreateQuestion,
  authorization,
} = require("../middlewares/authorization");
const router = express.Router();

router.post("/login", loginLimiter, UserController.glogin);

router.use(authentication);
router.use(questionLimiter);
router.get("/questions", QuestionController.getAllQuestion);
router.get("/questions/:id", QuestionController.getQuestionById);
router.post(
  "/questions",
  authorizationCreateQuestion,
  QuestionController.createQuestion
);
router.patch(
  "/questions/:id",
  authorization,
  QuestionController.updateAnswerQuestion
);
router.get("/types", TypeController.getTypes);

module.exports = router;
