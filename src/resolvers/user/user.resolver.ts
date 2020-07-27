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
        debug('Calling Me Query');
        try {
            const userService = Container.get(UserService);
            return await userService.Me({ session });
        } catch (e) {
            error('🔥 error: %o', e);
            return {
                error: e.message,
            };
        }
    }

    @Mutation(() => UserOutput)
    async signIn(@Arg('data') { email, password }: SignInput, @Ctx() { session }): Promise<UserOutput> {
        const { debug, error } = Container.get('logger');
        debug('Calling Sign-In Mutation with params: %o', { email, password });
        try {
            const userService = Container.get(UserService);
            return await userService.SignIn({ email, password, session });
        } catch (e) {
            error('🔥 error: %o', e);
            return {
                error: e.message,
            };
        }
    }

    @Mutation(() => UserOutput)
    async signUp(@Arg('data') { email, password }: SignInput, @Ctx() { url }): Promise<UserOutput> {
        const { debug, error } = Container.get('logger');
        debug('Calling Sign-Up Mutation with params: %o', { email, password });
        try {
            const userService = Container.get(UserService);
            return await userService.SignUp({ email, password, url });
        } catch (e) {
            error('🔥 error: %o', e);
            return {
                error: e.message,
            };
        }
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
