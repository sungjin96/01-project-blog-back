import { ArgsType, Field, ObjectType } from 'type-graphql';

@ArgsType()
export class SignUpArgs {
    @Field()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class SignUpOutput {
    @Field({ nullable: true })
    error?: string;

    @Field({ nullable: true })
    data?: string;
}
