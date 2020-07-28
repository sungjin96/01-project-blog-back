import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/../../.env') });

const config = {
    port: process.env.PORT || 4000,
    host: process.env.HOST || 'http://localhost:4000',
    nodeEnv: process.env.NODE_ENV || 'development',

    clientUrl: process.env.CLIENT_URL,
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY || '', 10),
    },
    app: {
        name: process.env.APP_NAME,
    },

    /**
     * Agendash config
     */
    agendash: {
        user: 'agendash',
        password: '123456',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },

    typeorm: {
        type: process.env.TYPEORM_TYPE || 'postgres',
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: true,
        logging: false,
        entities: ['src/entity/**/*.ts'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
    },

    sparkpost: {
        apiKey: process.env.SPARKPOST_API_KEY,
    },

    aws: {
        apiKey: process.env.AWS_S3_API_KEY,
        region: process.env.AWS_S3_REGION,
    },

    file: {
        paths: {
            thumbnail: '',
        },
    },
};

export default config;
