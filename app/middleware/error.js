const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      status: 'error',
      message: err.message,
    };
  }
};

module.exports = errorHandler;
