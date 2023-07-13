const { Question, User, Type } = require("../models");

class QuestionController {
  static async getAllQuestion(req, res, next) {
    try {
      const result = await Question.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          { model: User, as: "user", attributes: ["email"] },
          {
            model: Type,
            as: "type",
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });

      res.status(200).json({
        statusCode: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuestionController;
