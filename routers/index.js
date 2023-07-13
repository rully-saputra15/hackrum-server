const express = require("express");

const UserController = require("../controllers/userController");
const QuestionController = require("../controllers/questionController");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.post("/login", UserController.glogin);

router.use(authentication);

router.get("/questions", QuestionController.getAllQuestion);

module.exports = router;
