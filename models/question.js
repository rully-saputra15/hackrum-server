"use strict";
const { Model } = require("sequelize");
const { uuid } = require("uuidv4");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "authorId", as: "user" });
      this.belongsTo(models.Type, { foreignKey: "problemType", as: "type" });
      this.belongsTo(models.User, {
        foreignKey: "answerAuthorId",
        as: "answerAuthorUser",
      });
    }
  }
  Question.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      problemType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Problem type is required",
          },
          notEmpty: {
            msg: "Problem type is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authorId: DataTypes.UUID,
      answer: DataTypes.TEXT,
      answerAuthorId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Answer Author Id is required",
          },
          notEmpty: {
            msg: "Answer Author Id is required",
          },
        },
      },
      phase: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phase is required",
          },
          notEmpty: {
            msg: "Phase is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  Question.beforeCreate((question) => {
    question.id = uuid();
  });
  return Question;
};
