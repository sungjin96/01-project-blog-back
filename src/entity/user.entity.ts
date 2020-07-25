import {BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@Entity("users")
export default class UserEntity{
    @PrimaryColumn("uuid")
    id: string ;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @BeforeInsert()
    getId() {
        this.id = uuidv4();
    }
}