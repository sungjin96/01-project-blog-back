import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import { type } from 'os';
import UserEntity from './user.entity';

@ObjectType()
@Entity('comments')
export default class CommentEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Field()
    comment: string;

    @Field((type) => [CommentEntity], { nullable: true })
    childComment?: CommentEntity[];

    @Field((type) => UserEntity)
    user: UserEntity;
}
