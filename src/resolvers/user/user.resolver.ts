import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { SignInput, SignOutput } from './user.types';
import { Container } from 'typedi';
import UserService from '../../services/user.service';

@Resolver()
export default class UserResolver {
    @Mutation(() => SignOutput)
    async signIn(@Arg('data') { email, password }: SignInput, @Ctx() { req }): Promise<SignOutput> {
        const { debug, error } = Container.get('logger');
        debug('Calling Sign-In Mutation with params: %o', { email, password });
        try {
            const userService = Container.get(UserService);
            return await userService.SignIn({ email, password, req });
        } catch (e) {
            error('🔥 error: %o', e);
            return {
                error: e.message,
            };
        }
    }

    @Mutation(() => SignOutput)
    async signUp(@Arg('data') { email, password }: SignInput, @Ctx() { url }): Promise<SignOutput> {
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

    @Query(() => Boolean)
    async logout() {
        return true;
    }

    @Query(() => Boolean)
    async update() {
        return true;
    }
}
