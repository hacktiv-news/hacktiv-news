const router = require('express').Router()
const routesUser = require('./user')
const routesNews = require('./news')
const axios = require('axios')
const {authentication} = require('../middlewares/auth')

//3rd Party API News
// all news
router.get('/apis/news', (req, res, next) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=id&apiKey=${process.env.NEWS_API_KEY}`
    )
    .then((data) => {
      res.status(200).json({ success: true, data: data.data.articles });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

// sport news
router.get('/apis/news/sport', (req, res, next) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=id&category=sport&apiKey=${process.env.NEWS_API_KEY}`
    )
    .then((data) => {
      res.status(200).json({ success: true, data: data.data.articles });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

// health news
router.get('/apis/news/health', (req, res, next) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=${process.env.NEWS_API_KEY}`
    )
    .then((data) => {
      res.status(200).json({ success: true, data: data.data.articles });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
//3rd Party API News

router.get('/apis/weather/jakarta', (req, res, next) => {
  const kota = 'Jakarta'
  axios
    .get(
      `http://api.weatherstack.com/current?query=${kota}&access_key=${process.env.WEATHERSTACK_API_KEY}`
    )
    .then((data) => {
      res.status(200).json({ success: true, data: data.data });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get('/apis/weather/bandung', (req, res, next) => {
  const kota = 'Bandung'
  axios
    .get(
      `http://api.weatherstack.com/current?query=${kota}&access_key=${process.env.WEATHERSTACK_API_KEY}`
    )
    .then((data) => {
      res.status(200).json({ success: true, data: data.data });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.use('/', routesUser)
router.use(authentication);
router.use('/newscollection', routesNews);

module.exports = router
