const jwt = require('jsonwebtoken');
const { User, News } = require('../models');

const authentication = (req, res, next) => {
  if (!req.headers.access_token) return next({ name: 'MISSING_ACCESS_TOKEN' });

  try {
    const decoded = jwt.verify(
      req.headers.access_token,
      process.env.JWT_SECRET
    );
    req.userId = decoded.id;
  } catch (err) {
    return next({ name: 'INVALID_ACCESS_TOKEN' });
  }

  User.findByPk(req.userId)
    .then((user) => {
      if (!user) throw { name: 'LOGIN_FAIL' };
      next();
    })
    .catch((err) => next(err));
};

const newsAuthorization = (req, res, next) => {
  const { id } = req.params;

  News.findOne({ include: User, where: { id: id, UserId: req.userId } })
      .then((news) => {
          if (!news) throw { name: 'RESOURCE_NOT_FOUND' };
          req.news = news;
          req.user = news.User
          next();
      })
      .catch((err) => next(err));
};

module.exports = { authentication, newsAuthorization };
