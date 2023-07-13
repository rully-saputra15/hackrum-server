const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: "InvalidToken" };

    const payload = verifyToken(access_token);

    if (!payload) throw { name: "InvalidToken" };

    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) throw { name: "Unauthenticated" };

    req.user = {
      id: user.id,
      email: user.email,
      role: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
