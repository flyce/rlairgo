const redis = require('redis');

/***
 * redis db
 */
const redisClient = redis.createClient();

redisClient.on("error", function (err) {
    console.log("Error " + err);
});
redisClient.on("connect", function () {
    console.log("redis connected!");
});
redisClient.on("end", function () {
    console.log("Connect end");
});

module.exports = redisClient;