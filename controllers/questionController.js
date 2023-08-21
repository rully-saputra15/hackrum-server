const { Question, User, Type } = require("../models");

class QuestionController {
  static async getAllQuestion(req, res, next) {
    try {
      const result = await Question.findAll({
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["updatedAt", "answer", "imgUrl", "authorId", "problemType"],
        },
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
  static async createQuestion(req, res, next) {
    try {
      const { title, description, problemType, imgUrl, phase } = req.body;
      const authorId = req.user.id;
      const result = await Question.create({
        title,
        description,
        problemType,
        imgUrl,
        phase,
        authorId,
      });

      res.status(201).json({
        statusCode: 201,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getQuestionById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Question.findByPk(id, {
        attributes: {
          exclude: ["authorId", "problemType", "answerAuthorId"],
        },
        include: [
          { model: User, as: "user", attributes: ["email"] },
          { model: User, as: "answerAuthorUser", attributes: ["email"] },
          {
            model: Type,
            as: "type",
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ],
      });

      if (!result) throw { name: "NotFound", message: "Question not found" };

      res.status(200).json({
        statusCode: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateAnswerQuestion(req, res, next) {
    try {
      const { id } = req.params;
      const { answer, imgUrl } = req.body;
      const question = await Question.findByPk(id);

      if (!question) throw { name: "NotFound", message: "Question not found" };

      const result = await Question.update(
        {
          answer,
          imgUrl,
          answerAuthorId: req.user.id,
          status: "solved",
        },
        { where: { id }, returning: true }
      );

      res.status(200).json({
        statusCode: 200,
        message: result[1][0],
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuestionController;
