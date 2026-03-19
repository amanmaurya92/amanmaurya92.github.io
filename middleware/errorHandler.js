const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const message =
    err.message || (status === 500 ? "Internal Server Error" : err.message);

  if (process.env.NODE_ENV !== "test") {
    console.error(err.stack || err);
  }

  res.status(status).json({
    success: false,
    message: status === 500 && process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
