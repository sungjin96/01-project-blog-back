import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { Container } from 'typedi';

import config from '../config';
import routes from '../routes';

export default async ({ app }: { app: express.Application }) => {
    const RedisStore = connectRedis(session);
    const redis = Container.get('redis');

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(
        session({
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
        }),
    );

    app.use(cors({ credentials: true, origin: `${config.clientUrl}` }));

    // app.use(config.api.prefix, routes());
    app.use('/', routes());

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });

    return app;
};
