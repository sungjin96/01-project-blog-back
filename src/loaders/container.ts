import { Container } from 'typedi';
import LoggerInstance from './logger';
import { EntityManager } from 'typeorm';
import IORedis from 'ioredis';

export default ({
    entities,
    manager,
    redis,
}: {
    entities?: { name: string; entity: any }[];
    manager: EntityManager;
    redis: IORedis.Redis;
}) => {
    try {
        entities.forEach((m) => {
            Container.set(m.name, m.entity);
        });

        Container.set('redis', redis);
        Container.set('logger', LoggerInstance);
        Container.set('manager', manager);
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
