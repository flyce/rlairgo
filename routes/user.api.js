const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/env');
const redisClient = require('../database/redis');
const User = require('../models/User');

router.post('/login', function (req, res, next) {
    // 用户名和密码不能为空
    if (!(req.body.username && req.body.password)) {
        res.send({info: "username and password are required!"});
    }

    /***
     * 1. 数据库获取已经保存的密码
     * 2. 验证密码是否正确
     * 3. 签发TOKEN
     */
    User.findOne({username: req.body.username}, {"password": 1, "_id": 1}).then(function (currentUserInfo) {
        if (currentUserInfo.password) {
            bcrypt.compare(req.body.password, currentUserInfo.password).then(function (result) {
                if (result) {
                    const token = jwt.sign(
                        {
                            username: req.body.username,
                        },
                        config.secretKey,
                        {
                            expiresIn: config.expiresIn
                        }
                    );
                    redisClient.set(req.body.username, token);

                    /**
                     * for debug
                     */
                    // redisClient.get(req.body.username, function(err, reply) {
                    //     // reply is null when the key is missing
                    //     console.log(req.body.username + " login! \t token:" + reply);
                    // });
                    res.json({token: token, userId: currentUserInfo._id});
                } else {
                    res.send({
                        info: "username or password invalid!"
                    });
                }
            });
        } else {
            res.send({
                info: "user doesn't exists!"
            });
        }
    });
});

router.post('/register', function (req, res, next) {
    bcrypt.hash(req.body.password, config.saltRounds).then(function (hashPassword) {
        req.body.password = hashPassword;
        User.create(req.body).then(function (echo) {
            res.json({_id: echo._id});
        }).catch(next);
    });
});

module.exports = router;