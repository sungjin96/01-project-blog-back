import { v4 } from 'uuid';
import IORedis from 'ioredis';

export const createConfirmEmailLink = async ({ url, id, redis }: { url: string; id: string; redis: IORedis.Redis }) => {
    const uuid = v4();
    await redis.set(uuid, id, 'ex', '60 * 60 * 24');
    return `${url}/confirm/${uuid}`;
};
