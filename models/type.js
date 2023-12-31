"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Question, { foreignKey: "problemType" });
    }
  }
  Type.init(
    {
      title: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Type",
    }
  );
  return Type;
};
