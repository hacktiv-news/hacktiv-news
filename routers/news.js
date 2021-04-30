const router = require('express').Router();
const NewsController = require('../controllers/NewsController');
const { newsAuthorization } = require('../middlewares/auth');

router.post('/', NewsController.addNews);
router.get('/', NewsController.getNews);
router.delete('/:id', newsAuthorization, NewsController.deleteNews);

module.exports = router;
