const authorizationCreateQuestion = (req, res, next) => {
  try {
    if (!req.user.isActive) throw { name: "UserNotActive" };
    next();
  } catch (err) {
    next(err);
  }
};

const authorization = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "instructor") throw { name: "Forbidden" };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorizationCreateQuestion, authorization };
