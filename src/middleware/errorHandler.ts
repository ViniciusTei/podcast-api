const errorHandler = (err: Error, req, res, next) => {
  console.log('⚡️[server]: Error!');
  console.error(err.stack);

  res.status(500).send({
    error: err.stack,
  });
};

export default errorHandler;
