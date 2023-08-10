"use strict";
const { Model } = require("sequelize");
const { uuid } = require("uuidv4");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Question, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.id = uuid();
  });
  return User;
};
