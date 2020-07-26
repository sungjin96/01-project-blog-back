import Redis from 'ioredis';

export default () => {
    const redis = new Redis();

    return redis;
};
