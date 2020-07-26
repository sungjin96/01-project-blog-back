import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';
import UserEntity from './user.entity';
import BlogEntity from './blog.entity';

@ObjectType()
@Entity('comments')
export default class CommentEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    @Field()
    comment: string;

    @Field((type) => [CommentEntity!]!)
    childComment?: CommentEntity[];

    @Field((type) => UserEntity)
    author: UserEntity;

    @Field((type) => BlogEntity)
    blog: BlogEntity;

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    updatedAt: Date;

    @Column({ type: 'timestamp' })
    @Field(() => Date)
    deletedAt: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }
}
