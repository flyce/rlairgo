const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

const verifyToken = require('../middleware/verifyToken');

router.get('/:id', function (req, res, next) {
    Comment
        .find({videoId: req.params.id})
        .skip(parseInt(req.query.skip) || 0)
        .limit(parseInt(req.query.limit) || 10)
        .sort({ _id: -1 }) // 倒序显示
        .then(
            function (echo) {
                res.send(echo)
            }
        ).catch(next);
});

/***
 *
 * add a comment item
 *
{
	"videoId": "10003",
	"username": "Echo",
	"headImageUrl": "http://rlair.live:5000/headImageUrl.jpg",
	"context": "真棒6",
	"timeStamp": "1501150459"
}
 */
router.post('/', verifyToken, function (req, res, next) {
    Comment.create(req.body).then(function (echo) {
        res.send(echo);
    }).catch(next);
});

module.exports = router;