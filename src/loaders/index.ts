import Logger from './logger';
import typeormLoader from './typeorm';
import apolloLoader from './apollo';
import containerLoader from './container';
import expressLoader from './express'
import entities from '../entity'

export default async ({expressApp}) => {
    const connection = await typeormLoader();
    Logger.info('TypeOrm loaded');

    await containerLoader({entities, connection});
    Logger.info('✌️ Dependency Injector loaded');

    await apolloLoader({app: expressApp});
    Logger.info('✌️ Apollo Server loaded');

    await expressLoader({ app: expressApp });
    Logger.info('Express Intialized')
};
