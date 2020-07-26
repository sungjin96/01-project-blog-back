import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetRecipesArgs {
    @Field((type) => String, { defaultValue: 0 })
    message: string;
}
