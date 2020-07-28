import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class CommonOutputType {
    constructor() {
        this.status = 200;
    }

    @Field({ nullable: true })
    error?: string;

    @Field((type) => Number, { nullable: true })
    status?: number;
}
