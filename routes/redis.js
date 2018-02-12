const express = require('express');
const router = express.Router();
const redisService = require("../services/redis-service");

router.post('/hash/entry', function (req, res, next) {
    let key = req.body.key;
    let value = req.body.value;

    redisService.createHashEntry(key, value, function (err) {
        if (err) {
            console.error(err);
            res.sendStatus(400)
        }
        else
            res.sendStatus(201);
    });
});

/* incrBy redis api. hash int*/
router.put('/increment/:id', function (req, res, next) {
    let key = req.params.id;
    let value = req.body.value;

    redisService.incrementBy(key, value, function (err, reply) {
        if (err) {
            console.error(err);
            res.sendStatus(400);
            throw err;
        }
        else {
            let newValue = {
                increment: value,
                now: reply
            };
            res.send(newValue);
        }
    });
});

/* post redis api. hash key-jsobject */
router.post('/hashmap/entry', function (req, res, next) {
    let key = req.body.key;
    let value = req.body.value;

    redisService.createHashMapEntry(key, value, function (err) {
        if (err) {
            console.error(err);
            res.sendStatus(400)
        }
        else
            res.sendStatus(201);
    });
});

/* get redis api. hash key-jsobject */
router.get('/hashmap/entry/:id', function (req, res, next) {
    let key = req.params.id;

    redisService.getHashMapEntry(key, function (err, reply) {
        if (err) {
            console.error(err);
            res.sendStatus(400);
        }
        else
            res.send(reply);
    })
});

/* post redis api. string key-value */
router.post('/string/entry', function (req, res, next) {
    let key = req.body.key;
    let value = req.body.value;

    redisService.createStringEntry(key, value, function (err, reply) {
        if (err) {
            console.error(err);
            res.sendStatus(400);
        }
        else
            res.sendStatus(201);
    })
});

/* get redis api. string key-value */
router.get('/string/entry/:id', function (req, res, next) {
    let key = req.params.id;

    redisService.getStringEntry(key, function (err, reply) {
        if (err) {
            console.error(err);
            res.sendStatus(400);
        }
        else
            res.send(reply);
    });
});

/* delete redis api. flush all data in redis db */
router.delete('/delete', function (req, res, next) {

    redisService.flushDatabase(function (err, succeeded) {
        if (err) {
            console.error("error occured during flushing redis database");
            console.dir(err);
            res.sendStatus(500);
        }
        else if (!succeeded) {
            console.error("flushing redis database was not successful");
            res.sendStatus(400);
        }
        else res.sendStatus(200);
    });
});

module.exports = router;