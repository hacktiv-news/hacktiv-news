const { News } = require('../models');

class NewsController {
    static addNews(req, res, next) {
        let news = {
            title: req.body.title,
            url: req.body.url,
            UserId: req.userId
        };

        News.create(news)
            .then((news) => res.status(201).json({ data: news }))
            .catch((err) => next(err));
    }

    static getNews(req, res, next) {
        News.findAll({ where: { UserId: req.userId } })
            .then((news) => res.status(200).json({ data: news }))
            .catch((err) => next(err));
    }

    static deleteNews(req, res) {
        const { news } = req;

        news.destroy()
            .then(() =>
                res.status(200).json({ message: 'Success deleted news' })
            )
            .catch((err) => next(err));
    }
}

module.exports = NewsController;
