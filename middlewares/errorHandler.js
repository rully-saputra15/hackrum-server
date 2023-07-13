const errorHandler = (err, _req, res, _next) => {
  console.log(err);
  let statusCode = 0;
  let message = "";
  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case "JsonWebTokenError":
      statusCode = 400;
      message = "Invalid Token";
      break;
    case "InvalidToken":
      statusCode = 400;
      message = "Invalid Token";
      break;
    case "Unauthenticated":
      statusCode = 401;
      message = "Unauthenticated";
      break;
    default:
      statusCode = 500;
      message = "Internal Server Error";
      break;
  }

  res.status(statusCode).json({
    statusCode: statusCode,
    message: message,
  });
};

module.exports = errorHandler;
