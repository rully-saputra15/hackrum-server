const errorHandler = (err, _req, res, _next) => {
  console.log(err);
  let statusCode = 500;
  let message = "Internal Server Error";
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
    case "NotFound":
      statusCode = 404;
      message = err.message;
      break;
    case "Forbidden":
      statusCode = 403;
      message = "You prohibited to access";
    case "Unauthenticated":
      statusCode = 401;
      message = "Unauthenticated";
      break;
    default:
      break;
  }

  res.status(statusCode).json({
    statusCode: statusCode,
    message: message,
  });
};

module.exports = errorHandler;
