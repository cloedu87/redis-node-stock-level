const express = require('express');
const router = express.Router();
const redisService = require("../services/redis-service");

/* post redis api. hash key-jsobject */
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

/* get redis api. hash key-jsobject */
router.get('/hash/entry/:id', function (req, res, next) {
    let key = req.params.id;

    redisService.getHashEntry(key, function (err, reply) {
        if(err) {
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

    redisService.createStringEntry(key, value, function (err, reply)  {
        if(err) {
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
        if(err) {
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
        if(err | !succeeded) {
            console.error(err);
            res.sendStatus(400);
        }
        else
            res.sendStatus(200);
    });
});

module.exports = router;