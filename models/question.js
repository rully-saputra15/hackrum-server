"use strict";
const { Model } = require("sequelize");
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
      description: DataTypes.TEXT,
      problemType: DataTypes.INTEGER,
      status: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      answer: DataTypes.TEXT,
      phase: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
