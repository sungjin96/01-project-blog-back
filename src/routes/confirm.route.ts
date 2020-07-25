import express, { Router } from 'express';
import IORedis from 'ioredis';
import { Container } from 'typedi';
import UserService from '../services/user.service';

const router = express.Router();
export default (app: Router) => {
    app.use('/confirm', router);

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const { debug, error } = Container.get('logger');
        const { get } = Container.get('redis');

        debug('Calling Sign-Up Mutation with params: %o', { id });
        try {
            const userId = await get(id);

            if (userId) {
                const userService = Container.get(UserService);

                const result = await userService.UserConfirmUpdate({ id: userId });
                res.send(result);
            } else {
                res.send('invalid');
            }
        } catch (e) {
            error('🔥 error: %o', e);
            return {
                error: e.message,
            };
        }
    });
};
