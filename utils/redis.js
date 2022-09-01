const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor () {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.log('Redis Client Error', error);
    });
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    return value;
  }

  async set (key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del (key) {
    this.client.del(key);
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
