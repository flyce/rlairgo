const express = require('express');
const router = express.Router();

const Type = require('../models/Type');
const Video = require('../models/Video');

router.post('/', function (req, res, next) {
    Type.findOne(req.body).then(function (result) {
        if (result != null) {
            Type.remove(req.body).then(function (err) {
                res.json({"info": "removed"});
            })
        } else {
            Type.create(req.body).then(function (echo) {
                res.send(echo);
            }).catch(next);
        }
    }).catch(next);
});

router.get('/check/:type/:id', function (req, res, next) {
    Type.findOne({type:req.params.type, videoId: req.params.id}).then(function (result) {
        if (result != null) {
            res.send('true');
        } else {
            res.send('false');
        }
    }).catch(next);
});

router.get('/:type/:id', function (req, res, next) {
    if (req.params.id == null) {
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

    // Type.find({userId: req.params.id})
    //     // .populate('videos', 'title imageUrl')
    //     .exec(function (err, docs) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.json(docs);
    //         }
    //     });
});

module.exports = router;