import { Field, InputType, ObjectType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import UserEntity from '../../entity/user.entity';
import { CommonOutputType } from '../common.types';

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
export class UserOutput extends CommonOutputType {
    @Field({ nullable: true })
    data?: UserEntity;
}

@ObjectType()
export class UsersOutput extends CommonOutputType {
    @Field((type) => [UserEntity!]!, { nullable: true })
    data?: UserEntity[];
}
