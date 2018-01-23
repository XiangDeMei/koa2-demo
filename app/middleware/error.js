const errorHandler = async (ctx, next) => {
  try {
    await next();
    ctx.response.body = {
      status: 'success',
      ...ctx.response.body,
    };
  } catch (err) {
    console.log(err);
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      status: 'error',
      message: err.message,
    };
  }
};

module.exports = errorHandler;
