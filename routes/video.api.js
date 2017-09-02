const express = require('express');
const router = express.Router();
const VideoInfo = require('../models/Video');

const verifyToken = require('../middleware/verifyToken');

// Get the video list
router.get('/', function (req, res, next) {
    VideoInfo
        .find({}, {"title": 1, "imageUrl": 1, "_id": 1})
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
 * add a video item
 * Json format is as follows
 *
 {
     "title": "坚果Pro",
     "imageUrl": "http://192.168.123.107:3000/image.jpg",
     "src": "http://192.168.123.107:3000/demo.mp4",
     "introduction": "坚果 Pro，是锤子科技在2017年5月9日晚在深圳正式发布的旗下的第五款新机。全玻璃面板与金属中框，采用了双摄像头，拥有6.98mm的厚度，158g的重量，拥有红色和黑色两种常规配色，同时，加入了细红线版本。",
     "source": "smartisan"
 }
 *
 */
router.post('/', verifyToken, function (req, res, next) {
    VideoInfo.create(req.body).then(function (echo) {
        res.send(echo);
    }).catch(next);
});

// Get video details via video id
router.get('/:id', function (req, res, next) {
    VideoInfo
        .find(
            {
                _id: req.params.id
            },
            {
                "_id": 0,
                "title": 1,
                "imageUrl": 1,
                "src": 1,
                "introduction": 1
            })
        .then(
            function (echo) {
                res.send(echo)
            }
        );
});


// update video detail
// Content-Type: application/json
// {"title": "Echo"}
router.put('/:id', verifyToken, function (req, res, next) {
    VideoInfo.where({_id: req.params.id}).update({ $set: req.body}).then(function (data) {
        VideoInfo.findOne({_id: req.params.id}).then(function (echo) {
            res.send(echo);
        });
    }).catch(next);
});

// delete video item
router.delete('/:id', verifyToken, function (req, res, next) {
    VideoInfo.remove({_id: req.params.id }).then(function (echo) {
        let info = {info: 'delete fail.'};
        if (echo.n === 1) {
            info = {info: 'delete success.'}
        }
        res.send(info);
    }).catch(next);
});

module.exports = router;