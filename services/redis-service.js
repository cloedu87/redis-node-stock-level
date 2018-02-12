const redis = require("redis");

const redisConfig = {
    host: "pub-redis-17872.eu-central-1-1.1.ec2.redislabs.com",
    port: 17872,
    db: "redis-nano"
};

let service = {
    getRedisClient: function () {
        let client = redis.createClient(redisConfig.port, redisConfig.host, {no_ready_check: true});

        client.auth('redis-nano-1', function (err) {
            if (err) throw err;
        });
        client.on("error", function (err) {
            if (err) throw err;
        });
        return client;
    },
    incrementBy: function (key, increment, callback) {
        let client = service.getRedisClient();
        let incrementInt = parseInt(increment);

        client.incrby(key, incrementInt, function (err, reply) {
            client.quit();
            callback(err, reply);
        });
    },
    createHashEntry: function (key, value, callback) {
        let client = service.getRedisClient();

        client.set(key, value, function (err) {
            client.quit();
            callback(err);
        });
    },
    getStringEntry: function (key, callback) {
        let client = service.getRedisClient();

        client.get(key, function (err, reply) {
            client.quit();
            callback(err, reply);
        })
    },
    createStringEntry: function (key, value, callback) {
        let client = service.getRedisClient();

        client.set(key, value, function (err) {
            client.quit();
            callback(err);
        });
    },
    getHashMapEntry: function (key, callback) {
        let client = service.getRedisClient();
        client.hgetall(key, function (err, reply) {
            client.quit();
            callback(err, reply);
        });
    },
    createHashMapEntry: function (key, value, callback) {
        let client = service.getRedisClient();
        client.hmset(key, value, function (err) {
            client.quit();
            callback(err);
        });
    },
    flushDatabase: function (callback) {
        let client = service.getRedisClient();
        client.flushdb(function (err, succeeded) {
            client.quit();
            callback(err, succeeded);
        });
    }
};

module.exports = service;