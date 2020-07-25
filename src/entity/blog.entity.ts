import {BeforeInsert, Column, Entity, PrimaryColumn} from 'typeorm';
import {Field, ObjectType} from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@Entity("blogs")
export default class BlogEntity {
    @PrimaryColumn("uuid")
    id: string ;

    @Column()
    @Field()
    title:string;

    @Column()
    @Field()
    slug:string;

    @Column()
    @Field()
    body:string;

    @Column()
    @Field()
    excerpt: string;

    @Column()
    @Field()
    mtitle: string;

    @Column()
    @Field()
    mdesc: string;

    @BeforeInsert()
    getId() {
        this.id = uuidv4();
    }
}
