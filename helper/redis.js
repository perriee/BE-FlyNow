const redis = require("../config/redis");

exports.getDataRedis = async (key) => {
    const redisClient = await redis();
    try {
        let dataString = await redisClient.get(key);
        if (dataString) {
            data = JSON.parse(dataString); // need to be parsed because data in redis is string, so we will convert from string to js object/array
            return data;
        }
    } finally {
        await redisClient.disconnect();
    }
};

exports.setDataRedis = async (key, value, expiration) => {
    const redisClient = await redis();
    try {
        const payload = JSON.stringify(value);
        await redisClient.set(key, payload, {
            EX: expiration,
        });
    } finally {
        await redisClient.disconnect();
    }
};

exports.deleteDataRedis = async (key) => {
    const redisClient = await redis();
    try {
        await redisClient.del(key);
    } finally {
        await redisClient.disconnect();
    }
};
