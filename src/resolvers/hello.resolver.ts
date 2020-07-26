import { Args, Query, Resolver } from 'type-graphql';
import Joi from '@hapi/joi';
import { GetRecipesArgs } from './hello.args';

@Resolver()
export default class HelloResolver {
    @Query(() => String)
    async hello(@Args() { message }: GetRecipesArgs) {
        return message;
    }
}
