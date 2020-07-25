import 'reflect-metadata';
import loaders from './loaders';
import express from 'express';
import dotenv from 'dotenv';
import Logger from './loaders/logger';
import config from './config';

dotenv.config();

export async function startServer() {
    const app = express();

    await loaders({ expressApp: app });
    // @ts-ignore
    app.listen(config.port, (err) => {
        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
        Logger.info(`
      ################################################
      🛡️      Server listening on port: ${config.port}       🛡️
      ################################################
    `);
    });
}

startServer();
