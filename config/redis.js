const redis = require('redis');
const config = require('./config');

const rds = redis.createClient(config.redis_env);

module.exports = rds;
