import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { SignUpArgs, SignUpOutput } from './argsTypes/user.args';
import { Container } from 'typedi';
import UserService from '../services/user.service';

@Resolver()
export default class UserResolver {
    @Query(() => Boolean)
    async signIn() {
        return true;
    }

    @Mutation(() => SignUpOutput)
    async signUp(@Args() { email, password }: SignUpArgs, @Ctx() { url }) {
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
