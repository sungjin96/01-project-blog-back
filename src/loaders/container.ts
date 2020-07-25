import { Container } from 'typedi';
import LoggerInstance from './logger';
import {EntityManager} from 'typeorm';

export default ({ entities, connection }: { entities?: { name: string; model: any }[], connection:  EntityManager }) => {
    try {
        entities.forEach((m) => {
            Container.set(m.name, m.model);
        });

        Container.set('logger', LoggerInstance);
        Container.set('connection', connection);
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
