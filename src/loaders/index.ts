import Logger from './logger';
import typeormLoader from './typeorm';
import apolloLoader from './apollo';
import containerLoader from './container';
import expressLoader from './express';
import RedisLoader from './redis';
import entities from '../entity';
import session from 'express-session';
import config from '../config';
import connectRedis from 'connect-redis';

export default async ({ expressApp }) => {
    const manager = await typeormLoader();
    Logger.info('TypeOrm 로딩 완료');

    const redis = RedisLoader();
    Logger.info('✌️ Redis Server 로딩 완료');

    await containerLoader({ entities, manager, redis });
    Logger.info('✌️ Container 로딩 완료');

    // TODO: Apollo Server 세팅전에 미들웨어를 세팅해줘야 해서 임시로 여기서 세팅 이 친구는 여기 있으면 안되는 친구인데 ...
    const RedisStore = connectRedis(session);
    const sessionConfig = {
        store: new RedisStore({
            client: redis as any,
        }),
        name: 'qid',
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: config.nodeEnv === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7년
        },
    };
    expressApp.use(session(sessionConfig));

    await apolloLoader({ app: expressApp });
    Logger.info('✌️ Apollo Server 로딩 완료');

    await expressLoader({ app: expressApp });
    Logger.info('Express 설정 완료');
};
