import { Router } from 'express';
import confirmRoute from './confirm.route';
import IORedis from 'ioredis';

// guaranteed to get dependencies
export default () => {
    const app = Router();

    confirmRoute(app);

    return app;
};
