import { Arg, Authorized, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { SignInput, UserOutput } from './user.types';
import { Container } from 'typedi';
import UserService from '../../services/user.service';
import { IsAuth, Logger } from '../middlewares/common.middlewares';

@Resolver()
export default class UserResolver {
    @UseMiddleware(IsAuth)
    @Query(() => UserOutput)
    async me(@Ctx() { session }): Promise<UserOutput> {
        const { debug, error } = Container.get('logger');
        let userOutput = new UserOutput();
        debug('Calling Me Query');
        try {
            const userService = Container.get(UserService);
            userOutput = await userService.Me({ session, userOutput });
        } catch (e) {
            error('🔥 error: %o', e);
            userOutput.error = e.message;
            userOutput.status = 400;
        }

        return userOutput;
    }

    @Mutation(() => UserOutput)
    async signIn(@Arg('data') { email, password }: SignInput, @Ctx() { session }): Promise<UserOutput> {
        const { debug, error } = Container.get('logger');
        let userOutput = new UserOutput();
        debug('Calling Sign-In Mutation with params: %o', { email, password });
        try {
            const userService = Container.get(UserService);
            userOutput = await userService.SignIn({ email, password, session, userOutput });
        } catch (e) {
            error('🔥 error: %o', e);
            userOutput.error = e.message;
            userOutput.status = 400;
        }

        return userOutput;
    }

    @Mutation(() => UserOutput)
    async signUp(@Arg('data') { email, password }: SignInput, @Ctx() { url }): Promise<UserOutput> {
        const { debug, error } = Container.get('logger');
        let userOutput = new UserOutput();
        debug('Calling Sign-Up Mutation with params: %o', { email, password });
        try {
            const userService = Container.get(UserService);
            userOutput = await userService.SignUp({ email, password, url, userOutput });
        } catch (e) {
            error('🔥 error: %o', e);
            userOutput.error = e.message;
            userOutput.status = 400;
        }
        return userOutput;
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { session }): Promise<Boolean> {
        const { debug, error } = Container.get('logger');
        debug('Calling LogOut Mutation');
        try {
            session.destroy();
            return true;
        } catch (e) {
            error('🔥 error: %o', e);
            return false;
        }
    }

    @Query(() => Boolean)
    async update() {
        return true;
    }
}
