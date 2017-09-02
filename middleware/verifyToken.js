const redisClient = require('../database/redis');
const config = require('../config/env');
const jwt = require('jsonwebtoken');

/***
 * 验证 TOKEN 合法性
 * 1. 判断HEADER是否携带 TOKEN
 * 2. 验证 TOKEN 合法性
 *   2.1 合法， 与保存在redis的进行对比，对比通过，身份认证合法
 *   2.2 不合法，判断错误原因是否为过期，如果是 验证TOKEN与redis保存的是否一致，一致则通过认证
 * @param req
 * @param res
 * @param next
 */
function verifyToken(req, res, next) {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.json({
            info: "Authorization is required!"
        });
    } else {
        jwt.verify(auth, config.secretKey, function (err, decoded) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    let time = new Date(err.expiredAt).getTime() - new Date().getTime();
                    time = Math.abs(Math.round(time / 1000));
                    if (time < config.refreshTime) {
                        const decoded = jwt.decode(auth);
                        redisClient.get(decoded.username, function (err, data) {
                            if (err) {
                                res.json(err);
                            } else {
                                if (auth === data) {
                                    // 签发新的 TOKEN
                                    const token = jwt.sign(
                                        {
                                            username: decoded.username,
                                        },
                                        config.secretKey,
                                        {
                                            expiresIn: config.expiresIn
                                        }
                                    );
                                    redisClient.set(decoded.username, token);
                                    req.token = token;
                                    next();
                                } else {
                                    res.json({
                                        info: 'Invalid Token!'
                                    });
                                }
                            }
                        });
                    } else {
                        res.json({
                            info: 'Token Expired!'
                        });
                    }
                } else {
                    res.json({
                        info: 'Invalid Token!'
                    });
                }
            } else {
                // 验证用户提交的是否与数据库保存的一致
                redisClient.get(decoded.username, function (err, data) {
                    if (err) {
                        res.json(err);
                    } else {
                        if (auth === data) {
                            next();
                        } else {
                            res.json({
                                info: 'Login Expired!'
                            });
                        }
                    }
                });
            }
        });

    }
}

module.exports = verifyToken;