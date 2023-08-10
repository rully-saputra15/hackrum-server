const express = require("express");

const UserController = require("../controllers/userController");
const QuestionController = require("../controllers/questionController");
const TypeController = require("../controllers/typeController");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.post("/login", UserController.glogin);

router.use(authentication);

router.get("/questions", QuestionController.getAllQuestion);
router.get("/questions/:id", QuestionController.getQuestionById);
router.post("/questions", QuestionController.createQuestion);
router.patch("/questions/:id", QuestionController.updateAnswerQuestion);
router.get("/types", TypeController.getTypes);

module.exports = router;
