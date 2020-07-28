import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
} from 'typeorm';
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

    @ManyToOne((type) => CommentEntity, (comment) => comment.childComment)
    parentComment: CommentEntity;

    @OneToMany((type) => CommentEntity, (comment) => comment.parentComment)
    @Field((type) => [CommentEntity!]!)
    childComment?: CommentEntity[];

    @ManyToOne((type) => UserEntity, (user) => user.comments)
    @Field((type) => UserEntity)
    author: UserEntity;

    @ManyToOne((type) => BlogEntity, (blog) => blog.comments)
    @Field((type) => BlogEntity)
    blog: BlogEntity;

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    @Field(() => Date, { nullable: true })
    deletedAt?: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }
}
