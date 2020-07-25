import Logger from './logger';
import typeormLoader from './typeorm';
import apolloLoader from './apollo';
import containerLoader from './container';
import expressLoader from './express';
import RedisLoader from './redis';
import entities from '../entity';
import config from '../config';
import routes from '../routes';

export default async ({ expressApp }) => {
    const connection = await typeormLoader();
    Logger.info('TypeOrm 로딩 완료');

    const redis = RedisLoader;
    Logger.info('✌️ Redis Server 로딩 완료');

    await containerLoader({ entities, connection, redis });
    Logger.info('✌️ Container 로딩 완료');

    await apolloLoader({ app: expressApp });
    Logger.info('✌️ Apollo Server 로딩 완료');

    await expressLoader({ app: expressApp });
    Logger.info('Express 설정 완료');
};
