import { Field, InputType, ObjectType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import UserEntity from '../../entity/user.entity';

@InputType()
export class SignInput {
    @Field()
    @IsEmail()
    @Length(1, 255)
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class SignOutput {
    @Field({ nullable: true })
    error?: string;

    @Field({ nullable: true })
    data?: UserEntity;
}
