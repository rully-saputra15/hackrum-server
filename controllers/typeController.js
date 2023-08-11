const { Type } = require("../models");
const redis = require("../config/redisConnection");

class TypeController {
  static async getTypes(req, res, next) {
    try {
      const typesCache = await redis.get("types");

      if (typesCache) {
        res.status(200).json({
          statusCode: 200,
          message: JSON.parse(typesCache),
        });
      } else {
        const result = await Type.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt", "color"],
          },
        });
        await redis.set("types", JSON.stringify(result));
        res.status(200).json({
          statusCode: 200,
          message: result,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TypeController;
