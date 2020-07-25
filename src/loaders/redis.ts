import IORedis from 'ioredis';

export default async (): Promise<IORedis.Redis> => {
    const redis = new IORedis();

    return redis;
};
