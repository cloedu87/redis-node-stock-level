const express = require('express');
const router = express.Router();
const redis = require("redis");
const Promise = require("bluebird");

const redisConfig = {
    host: "pub-redis-17872.eu-central-1-1.1.ec2.redislabs.com",
    port: 17872,
    db: "redis-nano"
};

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

/* post redis api. hash key-jsobject */
router.post('/hash/entry', function (req, res, next) {
    let client = getRedisClient();
    let key = req.body.key;
    let value = req.body.value;

    console.log(JSON.stringify(value));
    client.hmset(key, value, function (err) {
        if (err) throw err;
        client.quit();
        res.sendStatus(201);
    });
});

/* get redis api. hash key-jsobject */
router.get('/hash/entry/:id', function (req, res, next) {
    let client = getRedisClient();
    let key = req.params.id;

    client.hgetall(key, function (err, reply) {
        if (err) throw err;
        client.quit();
        res.send(reply);
    });
});

/* post redis api. string key-value */
router.post('/string/entry', function (req, res, next) {
    let client = getRedisClient();
    let key = req.body.key;
    let value = req.body.value;

    client.set(key, value, function (err) {
        if (err) throw err;
        client.quit();
        res.sendStatus(201);
    });
});

/* get redis api. string key-value */
router.get('/string/entry/:id', function (req, res, next) {
    let client = getRedisClient();
    let key = req.params.id;

    client.get(key, function (err, reply) {
        if (err) throw err;
        client.quit();
        res.send(reply);
    });
});

/* delete redis api. flush all data in redis db */
router.delete('/delete', function (req, res, next) {
    let client = getRedisClient();

    client.flushdb(function (err, succeeded) {
        if (err) throw err;
        client.quit();
        if (succeeded) res.sendStatus(200);
        if (!succeeded) res.sendStatus(500);
    });
});

function getRedisClient() {
    let client = redis.createClient(redisConfig.port, redisConfig.host, {no_ready_check: true});

    client.auth('redis-nano-1', function (err) {
        if (err) throw err;
    });
    client.on("error", function (err) {
        if (err) throw err;
    });
    return client;
}

module.exports = router;