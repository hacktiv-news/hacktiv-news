const router = require('express').Router()
const routesUser = require('./user')
const axios = require('axios')

//3rd Party API News
// all news
router.get('/news', (req, res, next) => {
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
router.get('/news/sport', (req, res, next) => {
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
router.get('/news/health', (req, res, next) => {
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

router.get('/weather', (req, res, next) => {
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

router.use('/', routesUser)

module.exports = router
