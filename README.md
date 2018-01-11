# Summary
redis-node provides simple rest-api based on express server with a redis database connector uses the settings for redis-lab cloud service.

## features are...
+ powerful express server with rest-api
+ redis client connector with preconfiguration for redis-lab cloud database
+ poor error handling ;-)
+ store String key value paris to redis cloud
+ store complex hash object pairs to redis cloud
+ promise handling with bluebird

# Prerequisites \
nodeJS 6.x.x LTS installed \
npm 5.x.x installed \
postman installed \
subscribe to ``redis express``-postman collection \

# Setup \
install dependencies \
``npm install``

start express server on port 3000 \
``npm start``

checkout in browser/restclient \
``http://localhost:3000``

# helpful links \
## node and express \
https://github.com/NodeRedis/node_redis \
https://www.npmjs.com/package/express \
https://devhints.io/bluebird \
http://bluebirdjs.com/docs/getting-started.html \
http://bluebirdjs.com/docs/api/promisification.html \

## redis \
https://redis.io/ \
http://try.redis.io/ \
https://redislabs.com/ \