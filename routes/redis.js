const express = require('express');
const router = express.Router();
const redis = require("redis");

const redisConfig = {
    host:"pub-redis-17872.eu-central-1-1.1.ec2.redislabs.com",
    port:17872,
    db:"redis-nano"
};

/* post redis api. */
router.post('/string/entry', function(req, res, next) {
    let client = redis.createClient(redisConfig.port, redisConfig.host, {no_ready_check: true});
    let key = req.body.key;
    let value = req.body.value;

    client.auth('redis-nano-1', function (err) {
        if (err) throw err;
    });
    client.on("error", function (err) {
        if (err) throw err;
    });
    client.set(key, value, function(err) {
        client.get(key, function(err, reply) {
            if (err) throw err;
            client.quit();
            res.sendStatus(201);
        });
    });
});

/* get redis api. */
router.get('/string/entry/:id', function(req, res, next) {
    let client = redis.createClient(redisConfig.port, redisConfig.host, {no_ready_check: true});
    let key = req.params.id;

    client.auth('redis-nano-1', function (err) {
        if (err) throw err;
    });
    client.on("error", function (err) {
        if (err) throw err;
    });
    client.get(key, function(err, reply) {
        if (err) throw err;
        client.quit();
        res.send(reply);
    });
});
module.exports = router;