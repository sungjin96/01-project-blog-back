import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../config';
import path from "path";

export default async (): Promise<any> => {
    const connection = await createConnection({
        type: "postgres",
        host: config.typeorm.host,
        port: config.typeorm.port,
        username: config.typeorm.username,
        password: config.typeorm.password,
        database: config.typeorm.database,
        entities: [path.join(__dirname + '/../entity/*.entity.ts')],
        synchronize: config.typeorm.synchronize,
        logging: config.typeorm.logging,
    });

    return connection.manager;
};
