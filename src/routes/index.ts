import { Router } from 'express';
import confirmRoute from './confirm.route';

// guaranteed to get dependencies
export default () => {
    const app = Router();

    confirmRoute(app);

    return app;
};
