const errorHandler = (err, req, res, next) => {
  console.error(err.name);

  let errorCode;
  let errors = [];

  switch (err.name) {
    case 'SequelizeValidationError':
      errorCode = 400;
      errors = err.errors ? err.errors.map((el) => el.message) : [];
      break;
    case 'INVALID_ACCESS_TOKEN':
      errorCode = 401;
      errors.push('Invalid access token');
      break;
    case 'LOGIN_FAIL':
      errorCode = 401;
      errors.push('Email and/or password not found');
      break;
    case 'MISSING_ACCESS_TOKEN':
      errorCode = 401;
      errors.push('Missing access_token');
      break;
    case 'RESOURCE_NOT_FOUND':
      errorCode = 404;
      errors.push('Resource not found');
      break;
    case 'SequelizeUniqueConstraintError':
      errorCode = 409;
      errors = err.errors ? err.errors.map((el) => el.message) : [];
      break;
    default:
      errorCode = 500;
      errors.push('Internal server error');
  }

  res.status(errorCode).json({ errors });
};

module.exports = errorHandler;
