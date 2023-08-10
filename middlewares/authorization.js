const authorization = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "instructor") throw { name: "Forbidden" };
    next();
  } catch (err) {
    next(err);
  }
};
