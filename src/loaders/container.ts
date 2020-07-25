import { Container } from 'typedi';
import LoggerInstance from './logger';
import { EntityManager } from 'typeorm';
import IORedis from 'ioredis';

export default ({
    entities,
    connection,
    redis,
}: {
    entities?: { name: string; entity: any }[];
    connection: EntityManager;
    redis: IORedis.Redis;
}) => {
    try {
        entities.forEach((m) => {
            Container.set(m.name, m.entity);
        });

        Container.set('redis', redis);
        Container.set('logger', LoggerInstance);
        Container.set('connection', connection);
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
