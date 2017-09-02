const express = require('express');
const router = express.Router();

const Type = require('../models/Type');
const Video = require('../models/Video');

router.post('/', function (req, res, next) {
    Type.create(req.body).then(function (echo) {
        res.send(echo);
    }).catch(next);
});

router.get('/:type/:id', function (req, res, next) {
    if (req.params.id === "null") {
        const data = [];
        res.json(data);
    }
    Type
        .find({userId: req.params.id, type: req.params.type}, {videoId: 1, _id: 0})
        .then(
            function (echo) {
                new Promise(function(resolve, reject) {
                    const videoInfo = [];
                    var i = 0;
                    echo.map(function (data, index) {
                        Video.findById(data.videoId).then(function (video) {
                            videoInfo[i++] = video;
                            resolve(videoInfo);
                        });
                    });
                }).then(function (data) {
                        res.send(data);
                    }
                );


            }
        ).catch(next);
});

function getData(echo) {
    console.log(echo);
    const videoInfo = [];
    echo.map(function (data, index) {
        Video.findById(data.videoId).then(function (video) {
            return video;
        }).then(function (video) {
             return videoInfo.concat(video);
        }).then(function (da) {
            console.log(da);
        });
    });
    return videoInfo;
}

module.exports = router;