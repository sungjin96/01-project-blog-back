import {BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@Entity("tags")
export default class TagEntity{
    @PrimaryColumn("uuid")
    id: string ;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    slug: string;

    @BeforeInsert()
    getId() {
        this.id = uuidv4();
    }
}